const path = require('path');
require('dotenv').config(path.join(__dirname, '../.env'));
const mongoose = require('mongoose');
const { MONGO_URL } = process.env;
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Artist = require('../models/Artist');
const Song = require('../models/Song');

async function run() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to DB.")
        
        // Resetting database
        await Promise.all([User.collection.drop(), Artist.collection.drop(), Song.collection.drop()]);

        // Create users
        const pass1 = await bcrypt.hash("user1password", Number(process.env.SALT)) // hash the password
        const pass2 = await bcrypt.hash("user2password", Number(process.env.SALT))
        const users = [
            {
                "name": "User One",
                "username": "user1",
                "password": pass1,
                "email": "user1@gmail.com",
                "profilePicture": "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=600",
                "bio": "I am the first user of Spotify Lite"
            },
            {
                "name": "User Two",
                "username": "user2",
                "password": pass2,
                "email": "user2@gmail.com",
                "profilePicture": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600",
                "bio": "I am the second user of Spotify Lite"
            }
        ];
        const createUsers = await User.create(users);
        console.log("createUsers =", createUsers)

        // get user ids
        const userOne = User.findOne({ name: "User One" });
        const userTwo = User.findOne({ name: "User Two" })

        // Create new artists
        const artists = [
            {
                "name": "Taylor Swift",
                "verified": true,
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/440px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png",
                "bio": "Taylor Alison Swift (born December 13, 1989) is an American singer-songwriter. Her discography spans multiple genres, and her narrative songwriting—often inspired by her personal life—has received critical praise and media coverage.",
                "monthlyListeners": 35028019
            },
            {
                "name": "Adele",
                "verified": true,
                "picture": "https://upload.wikimedia.org/wikipedia/commons/5/52/Adele_for_Vogue_in_2021.png",
                "bio": "Adele Laurie Blue Adkins MBE (born 5 May 1988), professionally known by the mononym Adele, is an English singer and songwriter. After graduating in arts from the BRIT School in 2006, Adele signed a record deal with XL Recordings.",
                "monthlyListeners": 367839870
            },
            {
                "name": "Drake",
                "verified": true,
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Drake_July_2016.jpg/440px-Drake_July_2016.jpg",
                "bio": "Aubrey Drake Graham (born October 24, 1986) is a Canadian rapper and singer.[5] An influential figure in contemporary popular music, Drake has been credited for popularizing singing and R&B sensibilities in hip hop.",
                "monthlyListeners": 250192455
            },
            {
                "name": "BTS",
                "verified": true,
                "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/BTS_during_a_White_House_press_conference_May_31%2C_2022_%28cropped%29.jpg/600px-BTS_during_a_White_House_press_conference_May_31%2C_2022_%28cropped%29.jpg",
                "bio": "BTS (RR: Bangtan Sonyeondan; lit. Bulletproof Boy Scouts), also known as the Bangtan Boys, is a South Korean boy band that formed in 2010 and debuted in 2013 under Big Hit Entertainment. The septet—consisting of members Jin, Suga, J-Hope, RM, Jimin, V, and Jungkook—co-writes and co-produces much of their own material.",
                "monthlyListeners": 432428019
            }
        ]
        const createArtists = await Artist.create(artists);
        console.log("createArtist =", createArtists);

        // get Artsits id
        const taylorSwift = await Artist.findOne({ "name": "Taylor Swift" });
        const adele = await Artist.findOne({ "name": "Adele" });
        const drake = await Artist.findOne({ "name": "Drake" });
        const bts = await Artist.findOne({ "name": "BTS" });
        console.log("taylorSwift =", taylorSwift)
        // Create new songs:
        const songsTaylor = [
            {
                "name": "Anti-Hero",
                "picture": "https://upload.wikimedia.org/wikipedia/en/b/b9/Taylor_Swift_-_Anti-Hero.png",
                "length": 196,
                "year": 2022,
                "artists": [taylorSwift._id],
                "genre": "Pop",
                "language": "English"
            },
            {
                "name": "Bad Blood",
                "picture": "https://upload.wikimedia.org/wikipedia/en/9/9b/Taylor_Swift_Feat._Kendrick_Lamar_-_Bad_Blood_%28Official_Single_Cover%29.png",
                "length": 211,
                "year": 2015,
                "artists": [taylorSwift._id],
                "genre": "Pop",
                "language": "English"
            },
        ];
        const createSongsTaylor = await Song.create(songsTaylor);
        const taylorSongsIds = createSongsTaylor.map((song) => song._id)
        const updatedTaylor = await Artist.findByIdAndUpdate(taylorSwift._id, { songs: taylorSongsIds }, { new: true })
        
        const songsDrake = [
            {
                "name": "Trust Issue",
                "picture": "https://upload.wikimedia.org/wikipedia/en/8/8b/Drake_Care_Package_cover.jpg",
                "length": 280,
                "year": 2016,
                "artists": [drake._id],
                "genre": "RNB",
                "language": "English"
            },
            {
                "name": "One Dance",
                "picture": "https://upload.wikimedia.org/wikipedia/commons/5/59/DrakeOneDance.png",
                "length": 140,
                "year": 2016,
                "artists": [drake._id],
                "genre": "Funky",
                "language": "English"
            }
        ];
        const createSongsDrake = await Song.create(songsDrake);
        const drakeSongsIds = createSongsDrake.map((song) => song._id)
        const updatedDrake = await Artist.findByIdAndUpdate(drake._id, { songs: drakeSongsIds }, { new: true })

        const songsAdele = [
            {
                "name": "Easy On Me",
                "picture": "https://upload.wikimedia.org/wikipedia/en/4/48/Adele_-_Easy_on_Me.png",
                "length": 224,
                "year": 2021,
                "artists": [adele._id],
                "genre": "Pop",
                "language": "English"
            },        
            {
                "name": "Someone Like You",
                "picture": "https://upload.wikimedia.org/wikipedia/en/7/7a/Adele_-_Someone_Like_You.png",
                "length": 285,
                "year": 2011,
                "artists": [adele._id],
                "genre": "Pop",
                "language": "English"
            }
        ];
        const createSongsAdele = await Song.create(songsAdele);
        const adeleSongsIds = createSongsAdele.map((song) => song._id)
        const updatedAdele = await Artist.findByIdAndUpdate(adele._id, { songs: adeleSongsIds }, { new: true })

        const songsBts = [
            {
                "name": "Butter",
                "picture": "https://upload.wikimedia.org/wikipedia/en/d/db/BTS_-_Butter.png",
                "length": 164,
                "year": 2021,
                "artists": [bts._id],
                "genre": "Pop",
                "language": "Korean"
            },
            {
                "name": "Yet To Come",
                "picture": "https://upload.wikimedia.org/wikipedia/en/f/fb/BTS_-_Yet_to_Come_%28The_Most_Beautiful_Moment%29.png",
                "length": 199,
                "year": 2022,
                "artists": [bts._id],
                "genre": "Hip Hop",
                "language": "Korean"
            }
        ];
        const createSongsBts = await Song.create(songsBts);
        const btsSongsIds = createSongsBts.map((song) => song._id)
        const updatedBTS = await Artist.findByIdAndUpdate(bts._id, { songs: btsSongsIds }, { new: true });

        console.log("All songs =", await Song.find({}))
        console.log("All updated Artists =", await Artist.find({}))
    } catch (err) {
        console.log(err)
    } finally {
        await mongoose.connection.close()
    }
};

run().catch(console.dir)