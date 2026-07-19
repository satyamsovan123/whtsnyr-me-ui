const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'constants');

const updates = {
  'labels-en.ts': {
    LOGOUT: "'Logout'",
    EXPAND: "'Expand Sidebar'",
    COLLAPSE: "'Collapse Sidebar'"
  },
  'labels-hi.ts': {
    LOGOUT: "'लॉग आउट करें'",
    EXPAND: "'साइडबार फैलाएं'",
    COLLAPSE: "'साइडबार सिकोड़ें'"
  },
  'labels-bn.ts': {
    LOGOUT: "'লগ আউট'",
    EXPAND: "'সাইডবার প্রসারিত করুন'",
    COLLAPSE: "'সাইডবার সঙ্কুচিত করুন'"
  },
  'labels-ta.ts': {
    LOGOUT: "'வெளியேறு'",
    EXPAND: "'பக்கவாட்டுப் பட்டையை விரிக்கவும்'",
    COLLAPSE: "'பக்கவாட்டுப் பட்டையை சுருக்கவும்'"
  },
  'labels-te.ts': {
    LOGOUT: "'లాగ్ అవుట్ చేయండి'",
    EXPAND: "'సైడ్‌బార్ విస్తరించండి'",
    COLLAPSE: "'సైడ్‌బార్ కుదించండి'"
  },
  'labels-gj.ts': {
    LOGOUT: "'લૉગ આઉટ કરો'",
    EXPAND: "'સાઇડબાર વિસ્તૃત કરો'",
    COLLAPSE: "'સાઇડબાર સંકુચિત કરો'"
  },
  'labels-od.ts': {
    LOGOUT: "'ଲଗ୍ ଆଉଟ୍ କରନ୍ତୁ'",
    EXPAND: "'ସାଇଡବାର୍ ବିସ୍ତାର କରନ୍ତୁ'",
    COLLAPSE: "'ସାଇଡବାର୍ ସଙ୍କୁଚିତ କରନ୍ତୁ'"
  }
};

Object.keys(updates).forEach(filename => {
  const filePath = path.join(dir, filename);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add SETTINGS.LOGOUT
    if (!content.includes('LOGOUT:')) {
      content = content.replace(/LEGAL_DISCLAIMERS: \[/, `LOGOUT: ${updates[filename].LOGOUT},\n    LEGAL_DISCLAIMERS: [`);
    }

    // Add NAVBAR.EXPAND_SIDEBAR and COLLAPSE_SIDEBAR
    if (!content.includes('EXPAND_SIDEBAR:')) {
      content = content.replace(/SETTINGS: [^\n]+,/, `SETTINGS: ${content.match(/SETTINGS: [^\n]+,/)[0].split(': ')[1]}\n    EXPAND_SIDEBAR: ${updates[filename].EXPAND},\n    COLLAPSE_SIDEBAR: ${updates[filename].COLLAPSE},`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated tooltips in ${filename}`);
  }
});
