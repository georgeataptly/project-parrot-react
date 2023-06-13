import whisper
import os
import tempfile
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
# Members API Route
CORS(app)


@app.route('/', methods=['GET', 'POST'])
@app.route('/transcript', methods=['GET', 'POST'])
def transcript():
    file = request.files['audio']
    model = whisper.load_model('base')
    # Save the file to a temporary location on the server
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        file.save(tmp_file.name)

    audio = whisper.load_audio(tmp_file.name)
    result = model.transcribe(audio, fp16=False)
    print("Transcript comlpete")

    # Delete the temporary file
    os.unlink(tmp_file.name)
    return result.get('segments')


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port="8000")
