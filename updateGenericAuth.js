const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'constants');

const updates = {
  'labels-en.ts': { old: "'Sign In'", new: "'Account'" },
  'labels-hi.ts': { old: "'साइन इन करें'", new: "'खाता'" },
  'labels-bn.ts': { old: "'সাইন ইন করুন'", new: "'অ্যাকাউন্ট'" },
  'labels-ta.ts': { old: "'உள்நுழைக'", new: "'கணக்கு'" },
  'labels-te.ts': { old: "'సైన్ ఇన్ చేయండి'", new: "'ఖాతా'" },
  'labels-gj.ts': { old: "'સાઇન ઇન કરો'", new: "'એકાઉન્ટ'" },
  'labels-od.ts': { old: "'ସାଇନ୍ ଇନ୍ କରନ୍ତୁ'", new: "'ଆକାଉଣ୍ଟ'" }
};

Object.keys(updates).forEach(filename => {
  const filePath = path.join(dir, filename);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We only want to replace the FIRST occurrence (in NAVBAR) 
    // because the second one is in AUTH.
    content = content.replace(
      new RegExp(`SIGN_IN: ${updates[filename].old},`), 
      `SIGN_IN: ${updates[filename].new},`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated NAVBAR.SIGN_IN in ${filename}`);
  }
});
