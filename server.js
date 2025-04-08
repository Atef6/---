
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

app.post('/upload', (req, res) => {
  const imgData = req.body.image.replace(/^data:image\/png;base64,/, '');
  const filename = `photo_${Date.now()}.png`;

  fs.writeFile(`./images/${filename}`, imgData, 'base64', err => {
    if (err) {
      console.error("❌ خطأ أثناء الحفظ:", err);
      return res.sendStatus(500);
    }
    console.log("✅ تم حفظ الصورة:", filename);
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`📸 Server is running at http://localhost:${port}`);
});
