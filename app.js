const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const app = express()
const port = 3000


//menggunakan ejs

app.set('view engine', 'ejs')

//Third-party middleware
app.use(expressLayouts)
app.use(morgan('dev'))

//Application level middleware
app.use((req,res,next)=>{
    console.log("Time : ", Date.now())
    next()
}) //bisa lebih dari satu ALmiddleware

//built-in middleware
app.use(express.static('public'))

//third-party middleware

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Dwi Sandi',
            email: 'sandi@mail.com'
        },
        {
            nama: 'Achmad',
            email: 'achmad@mail.com'
        },
        {
            nama: 'Bambang P',
            email: 'bamp@mail.com'
        },
    ]
    res.render('index', { nama: 'Sandi YS', layout: 'layouts/main', title: 'Page Home', mahasiswa })
})
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main',
        title: 'Halaman About'
    })

})
app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main',
        title: 'Halaman contact'
    })
})

app.get('/product/:id', (req, res) => {
    res.send(`Product ID : ${req.params.id} <br> Category  : ${req.query.category}`)
})


app.use((req, res) => {
    res.status(404)
    res.send('404')
})
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})




// const http = require('http');
// const fs = require('fs')


// const port = 3000
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     })
//     const url = req.url

//     const renderHTML = (path, res) => {
//         fs.readFile(path, (err, data) => {
//             if (err) {
//                 res.writeHead(404)
//                 res.write('File not found')
//             } else {
//                 res.write(data)
//             }
//             res.end()
//         })
//     }

//     switch (url) {
//         case '/about':
//             renderHTML('./about.html', res)
//             break;
//         case '/contact':
//             renderHTML('./contact.html', res)
//             break;

//         default:
//             renderHTML('./index.html', res)
//             break;
//     }

//     // if (url === '/about') {
//     //     renderHTML('./about.html', res)
//     // } else if (url === '/contact') {
//     //     renderHTML('./contact.html', res)
//     // }
//     // else {
//     //     renderHTML(',/index.html', res)
//     // }
// }).listen(port, () => {
//     console.log(`Server is listening on port ${port}`)
// })

