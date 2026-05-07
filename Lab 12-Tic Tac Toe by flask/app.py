from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    # Debug mode is useful for local development (as shown in the lab).
    app.run(debug=True)

