// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.

require('./user.model.js');
require('./todolist.model.js');
require('./todo.model.js');