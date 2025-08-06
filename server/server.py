from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import stripe
import csv


CSV_FILE = "orders.csv"

app = Flask(__name__)
CORS(app)


# Endpoint to create PaymentIntent and return client_secret
STRIPE_SECRET_KEY = "sk_test_51R5FP0CyZlPHStJdtPlBALqWyi56nCughVwn5ORpOiKm1AukzeLOZqo7S3mHjACMa3yvq6V7EkLM9EDFscvrwEdh00FDxN9DOf"  # Replace with your actual secret key
STRIPE_PUBLIC_KEY = "pk_test_51R5FP0CyZlPHStJdCuTolKP7kOlg3Z6HRzXVDBzzcIS3EsMkNidMbVY08hhNU8ai70FxROjwEBnQ3aIGgpe6GjKC00fpNzLgyF"  # Replace with your actual public key
stripe.api_key = STRIPE_SECRET_KEY

@app.route("/create-payment-intent", methods=["POST"])
def create_payment_intent():
    try:
        print("Received request:", request.json)  # Print the request data

        data = request.json
        if not data:
            return jsonify({"error": "Missing request body"}), 400

        # Retrieve amount and cartItems from the request body
        amount = data.get("amount")
        cart_items = data.get("cartItems")  

        if not amount:
            return jsonify({"error": "Missing amount"}), 400

        if not cart_items:
            return jsonify({"error": "Missing cartItems"}), 400

        # Calculate the subtotal and tax from the cart items
        subtotal = sum(item['price'] for item in cart_items)  # Sum of the prices of all items
        tax = subtotal * 0.1  # 10% tax
        calculated_total = subtotal + tax

        # Verify if the total from the client matches the calculated total
        if round(calculated_total * 100) != amount:
            return jsonify({
                "error": "Calculated total does not match the provided amount",
                "calculatedTotal": calculated_total,
                "receivedAmount": amount
            }), 400

        # Create a PaymentIntent with the provided amount
        currency = data.get("currency", "usd")
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            automatic_payment_methods={"enabled": True},
        )

        return jsonify({"clientSecret": intent.client_secret})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/payment-status", methods=["POST"])
def payment_status():
    try:
        print("Received payment status:", request.json)

        data = request.json
        if not data:
            print("Missing request body")
            return jsonify({"error": "Missing request body"}), 400

        # Retrieve the paymentIntent id and payment status from the request body
        payment_intent_id = data.get("paymentIntentId")
        shippingAddress = data.get("shippingAddress")
        cartItems = data.get("cartItems")
        print("Shipping Address " + str(shippingAddress))
        print("Cart Items!!!!!! " + str(cartItems))
        print("Ding")
        status = data.get("status")

        if not payment_intent_id:
            return jsonify({"error": "Missing paymentIntentId"}), 400

        if not status:
            return jsonify({"error": "Missing status"}), 400

        if status == 'succeeded':
            print(f"Payment {payment_intent_id} succeeded.")
            log_order_information(payment_intent_id, shippingAddress, cartItems)
        elif status == 'failed':
            print(f"Payment {payment_intent_id} failed.")
        else:
            print(f"Payment {payment_intent_id} status is unknown.")
        
        return jsonify({"status": "received"})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
    

# Fetch gallery entries.
@app.route('/gallery.json')
def serve_gallery_json():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(current_dir, 'gallery.json')
    
@app.route("/payment-status/<payment_intent_id>", methods=["GET"])
def get_payment_status(payment_intent_id):
    try:
        # Retrieve the PaymentIntent object from Stripe
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)

        # Retrieve the status and shipping address
        payment_status = payment_intent.status

        print(f"Retrieved status for {payment_intent_id}: {payment_status}")

        # Return the payment status along with the shipping address
        return jsonify({
            "paymentIntentId": payment_intent_id,
            "status": payment_status
        })
    
    except stripe.error.StripeError as e:
        print("Stripe Error:", str(e))
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500


@app.route("/api/products", methods=["GET"])
def get_products():
    try:
        file_path = os.path.join(os.path.dirname(__file__), "products.json")
        with open(file_path, "r") as file:
            products = json.load(file)
        return jsonify(products)
    except Exception as e:
        return jsonify({"error": "Failed to load products", "details": str(e)}), 500

@app.route("/send", methods=["POST"])
def receive_data():
    data = request.json
    print("Received:", data)
    return jsonify({"message": "Data received!", "your_data": data})

@app.route("/get", methods=["GET"])
def send_data():
    return jsonify({"message": "Hello from Flask!"})



def log_order_information(payment_intent, shipping_address, cart_items):

    cart = json.loads(cart_items)

    existing_payment_intents = set()
    if os.path.exists(CSV_FILE):
        with open(CSV_FILE, mode='r', newline='', encoding='utf-8') as file:
            reader = csv.reader(file)
            next(reader, None) # Skip the header
            for row in reader:
                existing_payment_intents.add(row[0])
    
    if payment_intent in existing_payment_intents:
        print(f"Order with Payment ID {payment_intent} already logged.")
        return

    print("-------------PAYMENT SUCCESSFUL------------------")
    print("PAYMENT INTENT ID: " + payment_intent)
    print("Name: " + shipping_address.get("name"))
    print("Email: " + shipping_address.get("email"))
    print("Phone: " + shipping_address.get("phone"))
    print("Address: " + shipping_address.get("address"))
    print("City: " + shipping_address.get("city"))
    print("State: " + shipping_address.get("state"))
    print("Postal Code: " + shipping_address.get("postal_code"))
    print("Country: " + shipping_address.get("country"))
    print("----------------ORDERED ITEMS--------------------")
    for item in cart:
        print(item["productName"] + " ID: " + item["productID"])
    print("-------------------------------------------------")

    # Save order information to CSV
    with open (CSV_FILE, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # If its the first line, write the header of the csv
        if file.tell() == 0:
            writer.writerow(['Payment Intent ID', 'Name', 'Email', 'Phone', 'Address', 'City', 'Province', 'Postal Code', 'Country', 'Product Names', 'Additional Info'])

        # Write order details as a new row
        row = [
            payment_intent,
            shipping_address.get("name"),
            shipping_address.get("email"),
            shipping_address.get("phone"),
            shipping_address.get("address"),
            shipping_address.get("city"),
            shipping_address.get("state"),
            shipping_address.get("postal_code"),
            shipping_address.get("country"),
            ', '.join([item["productName"] for item in cart])
        ]

        # Check for additionalInfo
        for item in cart:
            additional_info = item.get("additionalInfo", "")
            if additional_info:
                row.append(item.get("productName") + ": " + additional_info)

        writer.writerow(row);

    print(f"Order with Payment Intent ID: {payment_intent} has been logged successfully.")



if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
