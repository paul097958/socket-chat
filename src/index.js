const onlineCount = document.getElementById('online_count')
const input = document.getElementsByTagName('input')[0]
const content = document.getElementById('content')

let socket = io.connect('https://socket-fqklvpd0h-letterpaulsand.vercel.app/');

socket.on('connect', () => {
    socket.on('sendOnlinePeople', data=>{
        onlineCount.innerText = data
    })
    socket.on('reloadText', data =>{
        content.innerHTML = ''
        data.map(item=>{
            let div = document.createElement('div')
            let text = document.createTextNode(item)
            div.appendChild(text)
            content.appendChild(div)
        })
        
    })
    input.addEventListener('keyup', e => {
        if(e.keyCode != 13) return
        socket.emit('newText', e.target.value)
        input.value = ''
    })
})

