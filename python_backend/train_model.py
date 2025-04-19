import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
import joblib

df = pd.read_csv('safety_scores.csv')

le_state = LabelEncoder()
le_district = LabelEncoder()
df['State_encoded'] = le_state.fit_transform(df['STATE/UT'])
df['District_encoded'] = le_district.fit_transform(df['DISTRICT'])

crime_cols = ['Rape', 'Kidnapping and Abduction', 'Dowry Deaths',
              'Assault on women with intent to outrage her modesty',
              'Insult to modesty of Women', 'Cruelty by Husband or his Relatives',
              'Importation of Girls']

df['Crime_Sum'] = df[crime_cols].sum(axis=1)
df['Log_Crime_Sum'] = np.log(df['Crime_Sum'] + 1)

df['Normalized_Log_Crime_Sum'] = (df['Log_Crime_Sum'] - df['Log_Crime_Sum'].min()) / (df['Log_Crime_Sum'].max() - df['Log_Crime_Sum'].min())
df['Overall_Safety_Score'] = (1 - df['Normalized_Log_Crime_Sum']) * 100  # Higher score = safer

np.random.seed(42)
df['Overall_Safety_Score'] += np.random.uniform(-1, 2, size=df.shape[0])  # Add small random variation

X = df[['State_encoded', 'District_encoded']]
y = df[crime_cols]  # Predict individual crime counts

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, 'safety_model.pkl')
joblib.dump(le_state, 'state_encoder.pkl')
joblib.dump(le_district, 'district_encoder.pkl')

df.to_csv('safety_scores.csv', index=False)
print("✅ Model, encoders, and updated CSV saved successfully.")
