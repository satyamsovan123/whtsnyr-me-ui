const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'constants');

const updates = {
  'labels-en.ts': { old: "'Logout'", new: "'Sign Out'" },
  'labels-hi.ts': { old: "'लॉग आउट करें'", new: "'साइन आउट करें'" },
  'labels-bn.ts': { old: "'লগ আউট'", new: "'সাইন আউট করুন'" },
  'labels-ta.ts': { old: "'வெளியேறு'", new: "'வெளியேறு'" }, // stays same in Tamil usually
  'labels-te.ts': { old: "'లాగ్ అవుట్ చేయండి'", new: "'సైన్ అవుట్ చేయండి'" },
  'labels-gj.ts': { old: "'લૉગ આઉટ કરો'", new: "'સાઇન આઉટ કરો'" },
  'labels-od.ts': { old: "'ଲଗ୍ ଆଉଟ୍ କରନ୍ତୁ'", new: "'ସାଇନ୍ ଆଉଟ୍ କରନ୍ତୁ'" }
};

Object.keys(updates).forEach(filename => {
  const filePath = path.join(dir, filename);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace LOGOUT value
    content = content.replace(
      new RegExp(`LOGOUT: ${updates[filename].old},`), 
      `LOGOUT: ${updates[filename].new},`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated LOGOUT to Sign Out in ${filename}`);
  }
});
