from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'districts': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/real_estate_prediction', methods=['GET', 'POST'])
def predict_home_price():
    total_sqft = float(request.form['building shifting total area'])
    location = request.form['district']
    rooms = int(request.form['num_room'])
    bathrooms = int(request.form['num_bathroom'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,rooms,bathrooms)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()