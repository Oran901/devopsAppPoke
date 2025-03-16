from flask import Flask, render_template, request, redirect, url_for
import requests
import os

app = Flask(__name__)

# Retrieve the API URL from an environment variable
default_api_url = "http://api:5001/api/quotes"
API_URL = os.getenv("API_URL", default_api_url)

@app.route("/", methods=["GET"])
def index():
    response = requests.get(f"{API_URL}")
    if response.status_code == 200:
        quotes_data = response.json()
        quotes = [{"text": q.get("quote", ""), "author": q.get("author", "")} for q in quotes_data]
    else:
        quotes = []
    return render_template("index.html", quotes=quotes)

@app.route("/submit", methods=["POST"])
def submit():
    quote = request.form["quote"]
    author = request.form["author"]
    requests.post(f"{API_URL}", json={"quote": quote, "author": author})
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)

