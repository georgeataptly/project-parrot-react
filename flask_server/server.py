import whisper
import os
import numpy as np
import tempfile
from flask import Flask, request
from flask_cors import CORS

model = whisper.load_model('base')


def get_transcript(file):
    audio = whisper.load_audio(file)
    result = model.transcribe(audio, fp16=False)
    print("Transcript comlpete")
    return result.get('segments')


app = Flask(__name__)
# Members API Route
CORS(app)


@app.route('/', methods=['GET', 'POST'])
@app.route('/transcript', methods=['GET', 'POST'])
def transcript():
    file = request.files['audio']
    # Save the file to a temporary location on the server
    with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
        file.save(tmp_file.name)

    # Call Whisper AI to get transcript and return the result
    transcript = get_transcript(tmp_file.name)

    # Delete the temporary file
    os.unlink(tmp_file.name)
    return transcript


if __name__ == "__main__":
    app.run(debug=True, host="localhost", port="8000")
