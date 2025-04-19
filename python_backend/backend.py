from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load dataset
data = pd.read_csv('safety_scores.csv')

# Crime columns (ensure they match your CSV exactly)
crime_columns = ['Rape', 'Kidnapping and Abduction', 'Dowry Deaths',
                 'Assault on women with intent to outrage her modesty',
                 'Insult to modesty of Women', 'Cruelty by Husband or his Relatives',
                 'Importation of Girls']

# Safety score label logic
def get_safety_message(score):
    if score >= 81:
        return "Safe ✅"
    elif score >= 61:
        return "Moderately Safe 🟡"
    elif score >= 41:
        return "Not Safe 🟠"
    else:
        return "Highly Unsafe 🔴"

@app.route('/predict', methods=['POST'])
def predict_safety():
    content = request.json
    state = content.get('state')
    district = content.get('district')

    # Filter dataset
    filtered_data = data[
        (data['STATE/UT'].str.lower() == state.lower()) & 
        (data['DISTRICT'].str.lower() == district.lower())
    ]

    if filtered_data.empty:
        return jsonify({'error': 'Invalid state or district name'}), 404

    # Calculate averages
    avg_safety_score = filtered_data['Overall_Safety_Score'].mean()
    avg_crimes = filtered_data[crime_columns].mean()

    message = get_safety_message(avg_safety_score)

    return jsonify({
        'overall_safety_score': round(avg_safety_score, 2),
        'safety_message': message,
        'individual_scores': {k: round(v, 2) for k, v in avg_crimes.items()}
    })

if __name__ == '__main__':
    app.run(debug=True)
