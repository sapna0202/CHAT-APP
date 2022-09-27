// Node Server which will Handle Socket Io connection

const io = require('socket.io')(8000,{
    cors: {
        origin: '*',
      }
});


// contains all users name
const users = {};


// connecting to the users
io.on('connection',socket =>{

    //  This will emit a message 'user joined the chat' when user connect
    socket.on('new-user-joined' , name =>{

            users[socket.id] = name;  //storing the id of new user joined

            socket.broadcast.emit('user-joined',name); //This will emit the user name when they joined

            io.emit('user_list',users); //This will emit the users list name 

    });

    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})  //this will emit the received message with username
    });


    // This will emit a message 'user left the chat' and 'user joined the chat' when user discconect 
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);

        delete users[socket.id]; //this will delete the id when users got left
        
        io.emit('user_list',users);
    });
   
});