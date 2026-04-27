import fetch from 'node-fetch';
import express, { Request, Response } from 'express';

const app = express();

const port = process.env.PORT || 3000;

type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue }
  | JSONValue[];

async function fetchWebApi(endpoint:string, method:string) {
  const res = await fetch(endpoint, {
    headers: {
      'User-Agent' : 'Album Review API/0.1.0 (https://github.com/LWBeck)'
    },
    method
  });
  return await res.json();
}

type Album = {
  id: number; 
  title: string;
  artist: string;
  rating: number;
  desc: string;
  tracklist: string[];
}

var albums:Album[]= [ 
  {id:1, title: 'Mágico Catástrofe', artist: 'Shibayan Records', rating: 5, desc:'Touhou nu-disco - 2012', 
    tracklist: [
      '雲がくれにし夜半の月かな',
      'Fall in the Dark',
      'Curse Mind',
      'Myoisia',
      'Clockup Flowers',
      '雨はりらりら',
      'いつか見たもの',
      '・－・・ －－－ ・・・－ ・'
    ]},

  {id:2, title:"TOHO BOOTLEGS", artist:"IOSYS", rating:5, desc:"Touhou EDM - 2019",
    tracklist: [
      "GORILLA MAIDEN",
      "Lunatic Love",
      "Alien Yosami",
      "フランドールの怒り",
      "Native Faith(Hylen Remix)",
      "Queen of Silence",
      "Anywhere but here"
	]},

  {id: 3, title:"HANIPAGANDA", artist:"Akatsuki Records", rating: 4.5, desc:"Touhou hard rock - 2019",
    tracklist: [
      "イドラ・デウス -The Creator-",
      "HANIPAGANDA",
      "Like An Animal",
      "STEP123",
      "ロック！ロカバベイベ ",
      "日々是好日",
      "荒野のペガサス",
      "祈りの器"
    ]
  }
];

app.use(express.json());


app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
});


app.get('/album', (req, res)=>{
    return res.json(albums);
})


app.get('/album/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log("id: "+id)
  const al:Album | undefined = albums.find(al => al?.id === id);
  if (!al) {
    return res.status(404).json({ message: 'Album not found' });
  }
  res.json(al);
});


app.post('/album', (req, res) => {
  const newAlbum:Album = {
    id: albums.length > 0 ? Math.max(...albums.map(a => a.id)) + 1 : 1,
    title: req.body.title,
    artist: req.body.artist,
    rating: req.body.rating,
    desc: req.body.desc,
    tracklist: req.body.tracklist
  };
  if (!newAlbum.title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    albums.push(newAlbum);
    res.status(201).json(albums);
});


app.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  console.log("id: "+id)
  const al:Album | undefined = albums.find(al => al?.id === id);
  if (!al) {
    return res.status(404).json({ message: 'Album not found' });
  }
  const index:number = albums.indexOf(al);

  if (index > -1) {
    albums.splice(index, 1);
  }
  res.json(albums);
});


app.get('/search/:query', async (req,res) =>{
  const name:String = req.params.query;
  const search:unknown = await fetchWebApi(`https://musicbrainz.org/ws/2/release/?fmt=json&limit=10&query=release:${name.replaceAll(' ','%20')}`, 'GET');
  const searchJSON = search as JSONValue;
  res.json(search);
  return search;
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

