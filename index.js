const { create } = require('@open-wa/wa-automate');
const start = require('./handler/message');
const options = require('./options');

create(options).then((client) => start(client));
