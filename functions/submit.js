const { google } = require('googleapis');
const { readFileSync } = require('fs');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(readFileSync('./google-service-account.json')),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = '1KBxsza-TVYhT9AbzZ8meJ1QwrLF338od5faSA5KPga0';
    const sheetName = '問卷填答結果';

    const row = [
      new Date().toLocaleString(),
      body.visit_times,
      body.gender,
      body.age_range,
      body.reason,
      body.platforms,
      body.city,
      body.district,
      body.fry_rating,
      body.cooked_rating,
      body.portion,
      body.sashimi_rating,
      body.revisit,
      body.price_match,
      body.suggestion,
      body.name,
      body.phone,
      body.dining_date,
      body.dining_period,
      body.price_select,
      body.price_reason,
      body.price_value,
      body.price_next,
      body.price_gap,
      body.recommend,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [row] },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ result: 'success' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Unknown error' }),
    };
  }
};
