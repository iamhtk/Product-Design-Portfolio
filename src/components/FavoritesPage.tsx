import { useState } from 'react';
import { Linkedin, Youtube, Instagram, Facebook, Github, Figma } from 'lucide-react';
import { ScrollToTop } from './ScrollToTop';

const MUSIC: {
  album: string;
  artist: string;
  genre: string;
  year: number;
  coverUrl: string;
  artistUrl: string;
}[] = [
  { album: 'Avicii Forever', artist: 'Avicii', genre: 'EDM / Progressive House / Electro House', year: 2024, coverUrl: '/favorites/AviciiForever_2000x.webp', artistUrl: 'https://avicii.com/' },
{ album: 'TIM', artist: 'Avicii', genre: 'EDM / Progressive House / Folk EDM', year: 2019, coverUrl: '/favorites/AVICIITIM_2000x.webp', artistUrl: 'https://avicii.com/' },
{ album: 'Bridge Over Troubled Water', artist: 'Simon & Garfunkel', genre: 'Folk Rock / Soft Rock / Baroque Pop', year: 1970, coverUrl: '/favorites/SIMONGARFUBRIDGEOVER_2019-11-06_13-19-30_EBOJr05GeF_2000x.webp', artistUrl: 'https://www.simonandgarfunkel.com/' },
{ album: 'Rumours', artist: 'Fleetwood Mac', genre: 'Soft Rock / Pop Rock / Adult Contemporary', year: 1977, coverUrl: '/favorites/fm-3.jpg', artistUrl: 'https://www.fleetwoodmac.com/' },
{ album: 'True', artist: 'Avicii', genre: 'EDM / Progressive House / Country EDM', year: 2013, coverUrl: '/favorites/AVICIITRUE_fa1f8c6d-ecb8-445c-a963-9878ab4c4407_2000x.webp', artistUrl: 'https://avicii.com/' },
{ album: 'American Idiot', artist: 'Green Day', genre: 'Punk Rock / Pop Punk / Alternative Rock Opera', year: 2004, coverUrl: '/favorites/green-day-american-idiot.png', artistUrl: 'https://www.greenday.com/' },
{ album: 'Saviors', artist: 'Green Day', genre: 'Punk Rock / Pop Punk', year: 2024, coverUrl: '/favorites/GreenDay_2000x.webp', artistUrl: 'https://www.greenday.com/' },
{ album: 'Stories', artist: 'Avicii', genre: 'EDM / Progressive House / Folk EDM', year: 2015, coverUrl: '/favorites/stories.png', artistUrl: 'https://avicii.com/' },
{ album: 'Father of All…', artist: 'Green Day', genre: 'Garage Rock / Pop Punk / Alternative Rock', year: 2020, coverUrl: '/favorites/GREENDAYFATHEROFAL2_2000x.webp', artistUrl: 'https://www.greenday.com/' },
{ album: 'The Stranger', artist: 'Billy Joel', genre: 'Pop Rock / Piano Rock / Soft Rock', year: 1977, coverUrl: '/favorites/TheStranger_2024Reissue_2000x.webp', artistUrl: 'https://www.billyjoel.com/' },
{ album: 'Abbey Road', artist: 'The Beatles', genre: 'Rock / Pop Rock / Progressive Pop', year: 1969, coverUrl: '/favorites/1LP_front-1.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Wish You Were Here', artist: 'Pink Floyd', genre: 'Progressive Rock / Psychedelic Rock / Art Rock', year: 1975, coverUrl: '/favorites/WishYouWereHere_2000x.webp', artistUrl: 'https://www.pinkfloyd.com/' },

{ album: 'Let It Be', artist: 'The Beatles', genre: 'Rock / Pop Rock / Gospel Rock', year: 1970, coverUrl: '/favorites/let-it-be-lp.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Avīci (01)', artist: 'Avicii', genre: 'EDM / Progressive House / Electro House', year: 2024, coverUrl: '/favorites/aviciii-01-vinyl-concept-v0-sj3j94qtloje1.png', artistUrl: 'https://avicii.com/' },

{ album: 'Face Value', artist: 'Phil Collins', genre: 'Pop Rock / Soft Rock / Art Pop', year: 1981, coverUrl: '/favorites/phil-collins---face_value_lp-edit.jpg', artistUrl: 'https://www.philcollins.com/' },
{ album: 'Piano Man', artist: 'Billy Joel', genre: 'Piano Rock / Pop Rock / Singer-Songwriter', year: 1973, coverUrl: '/favorites/Y4LPBJ004.webp', artistUrl: 'https://www.billyjoel.com/' },
{ album: '21st Century Breakdown', artist: 'Green Day', genre: 'Punk Rock / Pop Punk / Alternative Rock', year: 2009, coverUrl: '/favorites/gd-21cbd.png', artistUrl: 'https://www.greenday.com/' },
{ album: '¡Uno!', artist: 'Green Day', genre: 'Pop Punk / Power Pop / Alternative Rock', year: 2012, coverUrl: '/favorites/gd-uno.png', artistUrl: 'https://www.greenday.com/' },
{ album: '¡Tré!', artist: 'Green Day', genre: 'Punk Rock / Garage Rock / Pop Punk', year: 2012, coverUrl: '/favorites/gd-tre.png', artistUrl: 'https://www.greenday.com/' },
{ album: 'Dookie', artist: 'Green Day', genre: 'Punk Rock / Pop Punk / Skate Punk', year: 1994, coverUrl: '/favorites/dookie.jpg', artistUrl: 'https://www.greenday.com/' },
{ album: '¡Dos!', artist: 'Green Day', genre: 'Garage Rock / Pop Punk / Alternative Rock', year: 2012, coverUrl: '/favorites/gd-dos.png', artistUrl: 'https://www.greenday.com/' },
{ album: 'Greatest Hits', artist: 'Simon & Garfunkel', genre: 'Folk Rock / Soft Rock', year: 1972, coverUrl: '/favorites/SIMONGARFUGREATESTHI_2000x.webp', artistUrl: 'https://www.simonandgarfunkel.com/' },
{ album: 'Fleetwood Mac', artist: 'Fleetwood Mac', genre: 'Blues Rock / Rock / British Blues', year: 1968, coverUrl: '/favorites/fm-4.webp', artistUrl: 'https://www.fleetwoodmac.com/' },
{ album: 'Warning:', artist: 'Green Day', genre: 'Folk Punk / Alternative Rock / Pop Punk', year: 2000, coverUrl: '/favorites/GD_Warning25-1LPMockup_a7fbf309-e5d6-41f0-b364-5753ae634345.webp', artistUrl: 'https://www.greenday.com/' },
{ album: 'Greatest Hits: God’s Favorite Band', artist: 'Green Day', genre: 'Punk Rock / Pop Punk / Alternative Rock', year: 2017, coverUrl: '/favorites/GREENDAYGREATESTHI_2000x (1).webp', artistUrl: 'https://www.greenday.com/' },
{ album: 'Use Your Illusion I', artist: 'Guns N’ Roses', genre: 'Hard Rock / Glam Metal / Blues Rock', year: 1991, coverUrl: '/favorites/GUNSNROSESUSEYOURILL_2019-11-06_13-19-30_yJslYqlJO5_2000x.webp', artistUrl: 'https://www.gunsnroses.com/' },
{ album: 'Use Your Illusion II', artist: 'Guns N’ Roses', genre: 'Hard Rock / Glam Metal / Blues Rock', year: 1991, coverUrl: '/favorites/GUNSNROSESUSEYOURILL2_2019-11-06_13-19-30_QBeYUaTQxk_2000x.webp', artistUrl: 'https://www.gunsnroses.com/' },
{ album: 'Revolution Radio', artist: 'Green Day', genre: 'Punk Rock / Alternative Rock / Pop Punk', year: 2016, coverUrl: '/favorites/gd-rr.png', artistUrl: 'https://www.greenday.com/' },
{ album: '52nd Street', artist: 'Billy Joel', genre: 'Pop Rock / Jazz Pop', year: 1978, coverUrl: '/favorites/52ndStreet_2024Reissue_2000x.webp', artistUrl: 'https://www.billyjoel.com/' },
  { album: 'Anthology 1', artist: 'The Beatles', genre: 'Rock / Pop Rock', year: 1995, coverUrl: '/favorites/Anthology4_3LPSet_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
  { album: 'AM', artist: 'Arctic Monkeys', genre: 'Indie Rock / Alternative Rock', year: 2013, coverUrl: '/favorites/ARCTICMONKAM_2019-11-06_13-19-30_qEW58eTNOl_2000x.webp', artistUrl: 'https://www.arcticmonkeys.com/' },
{ album: 'True (Avicii By Avicii)', artist: 'Avicii', genre: 'EDM / Progressive House / Remix', year: 2014, coverUrl: '/favorites/trueava.png', artistUrl: 'https://avicii.com/' },
{ album: 'Born for This Moment', artist: 'Chicago', genre: 'Rock / Pop Rock / Soft Rock', year: 2022, coverUrl: '/favorites/chicago.webp', artistUrl: 'https://chicagotheband.com/' },
{ album: '1967–1970 (The Blue Album)', artist: 'The Beatles', genre: 'Rock / Pop Rock / Psychedelic Rock', year: 1973, coverUrl: '/favorites/BlueColorVinyl.webp', artistUrl: 'https://www.thebeatles.com/' },

{ album: '...But Seriously', artist: 'Phil Collins', genre: 'Pop Rock / Soft Rock / Adult Contemporary', year: 1989, coverUrl: '/favorites/COLLINSPHIBUTSERIOUS_2048x.webp', artistUrl: 'https://www.philcollins.com/' },
{ album: 'Revolver', artist: 'The Beatles', genre: 'Psychedelic Rock / Pop Rock / Art Rock', year: 1966, coverUrl: '/favorites/0602445599691_p0_v4_s1200x630.jpg', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Whatever People Say I Am, That’s What I’m Not', artist: 'Arctic Monkeys', genre: 'Indie Rock / Garage Rock', year: 2006, coverUrl: '/favorites/ARCTICMONKWHATEVERPE_2000x.webp', artistUrl: 'https://www.arcticmonkeys.com/' },
{ album: 'Tango in the Night', artist: 'Fleetwood Mac', genre: 'Pop Rock / Soft Rock / Synth Rock', year: 1987, coverUrl: '/favorites/fm-1.webp', artistUrl: 'https://www.fleetwoodmac.com/' },
{ album: 'Greatest Hits', artist: 'Fleetwood Mac', genre: 'Rock / Pop Rock', year: 1988, coverUrl: '/favorites/fm-5.jpeg', artistUrl: 'https://www.fleetwoodmac.com/' },

{ album: 'Help!', artist: 'The Beatles', genre: 'Rock / Pop Rock / Beat', year: 1965, coverUrl: '/favorites/help.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'I Want to Hold Your Hand', artist: 'The Beatles', genre: 'Rock & Roll / Beat / Pop Rock', year: 1963, coverUrl: '/favorites/7inch_0000_Beatles_IWantTo_7_3D_front_Black.png', artistUrl: 'https://www.thebeatles.com/' },

{ album: 'An Innocent Man', artist: 'Billy Joel', genre: 'Pop / Soul / Soft Rock', year: 1983, coverUrl: '/favorites/31441476-0f65-4312-b675-bf0270dc9ceb.e11b8d1564abac0104c4208ed70f4f97.webp', artistUrl: 'https://www.billyjoel.com/' },
{ album: "England's Newest Hit Makers", artist: 'The Rolling Stones', genre: 'Rock & Roll / Blues Rock / British Invasion', year: 1964, coverUrl: '/favorites/21391-EnglandsNewestHitmakers-VinylPackshot.webp', artistUrl: 'https://rollingstones.com/' },
{ album: 'Greatest Hits', artist: 'Queen', genre: 'Rock / Glam Rock / Hard Rock', year: 1981, coverUrl: '/favorites/8258498232625_85quality_Queen_-_Greatest_Hits_2LP.webp', artistUrl: 'https://www.queenonline.com/' },
{ album: 'Greatest Hits II', artist: 'Queen', genre: 'Rock / Arena Rock / Pop Rock', year: 1991, coverUrl: '/favorites/greatesthitsii1lp_afdb8a05-593e-42f5-a82a-9a6fe7f7cfad.webp', artistUrl: 'https://www.queenonline.com/' },
{ album: 'Bohemian Rhapsody (50th Anniversary Edition)', artist: 'Queen', genre: 'Rock / Progressive Rock / Classic Rock', year: 2025, coverUrl: '/favorites/queen_902ac5dc-dcb5-427e-aee0-870086b1e9f8.webp', artistUrl: 'https://www.queenonline.com/' },
{ album: 'Queen II', artist: 'Queen', genre: 'Hard Rock / Glam Rock / Progressive Rock', year: 1974, coverUrl: '/favorites/QUEENQUEENII_2048x.webp', artistUrl: 'https://www.queenonline.com/' },
{ album: 'Hatful of Hollow', artist: 'The Smiths', genre: 'Indie Rock / Alternative Rock / Jangle Pop', year: 1984, coverUrl: '/favorites/SMITHSTHEHATFULOFHO_2019-12-19_08-10-32_DhAPOpTAVA_d6b2896a-929a-4c9a-ab48-808dbc25f19c_2000x.webp', artistUrl: 'https://www.thesmiths.cat/' },
{ album: 'The Smiths', artist: 'The Smiths', genre: 'Indie Rock / Alternative Rock / Jangle Pop', year: 1984, coverUrl: '/favorites/SMITHSTHETHESMITHS_2000x.webp', artistUrl: 'https://www.thesmiths.cat/' },
{ album: 'Greatest Hits', artist: 'Bruce Springsteen', genre: 'Heartland Rock / Rock / Folk Rock', year: 1995, coverUrl: '/favorites/SPRINGSTEEGREATESTHI_2019-11-06_13-19-30_BLUoKw4X79_2000x.webp', artistUrl: 'https://brucespringsteen.net/' },
{ album: 'Fine Line', artist: 'Harry Styles', genre: 'Pop / Soft Rock / Indie Pop', year: 2019, coverUrl: '/favorites/STYLESHARRFINELINEBLK_2000x.webp', artistUrl: 'https://hstyles.co.uk/' },
{ album: 'Tales of Mystery and Imagination', artist: 'The Alan Parsons Project', genre: 'Progressive Rock / Art Rock / Symphonic Rock', year: 1976, coverUrl: '/favorites/TalesofMysteryandImagination-EdgarAllanPoe_45RPMAudiophileEdition_2000x.webp', artistUrl: 'https://alanparsons.com/' },
{ album: 'Telos', artist: 'Zedd', genre: 'EDM / Electro House / Pop EDM', year: 2024, coverUrl: '/favorites/Telos_2000x.webp', artistUrl: 'https://zedd.net/' },
{ album: 'The Beatles', artist: 'The Beatles', genre: 'Rock / Pop Rock / Psychedelic Rock', year: 1968, coverUrl: '/favorites/the_beatles_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'The Bootleg Series Vol. 1–3 (Rare & Unreleased 1961–1991)', artist: 'Bob Dylan', genre: 'Folk Rock / Americana / Singer-Songwriter', year: 1991, coverUrl: '/favorites/TheBootlegSeries_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },
{ album: 'The Concert in Central Park', artist: 'Simon & Garfunkel', genre: 'Folk Rock / Soft Rock / Live', year: 1982, coverUrl: '/favorites/TheConcertInCentralPark_Live_1_2000x.webp', artistUrl: 'https://www.simonandgarfunkel.com/' },
{ album: 'The Dark Side of the Moon', artist: 'Pink Floyd', genre: 'Progressive Rock / Psychedelic Rock / Art Rock', year: 1973, coverUrl: '/favorites/TheDarkSideoftheMoon_50thAnniversaryRemaster_2000x.webp', artistUrl: 'https://www.pinkfloyd.com/' },
{ album: 'The Forest Is the Path', artist: 'Snow Patrol', genre: 'Alternative Rock / Indie Rock / Post-Britpop', year: 2024, coverUrl: '/favorites/TheForestIsThePath_ForestGreenMarbleVinyl_2000x.webp', artistUrl: 'https://snowpatrol.com/' },
{ album: 'The Marshall Mathers LP 2', artist: 'Eminem', genre: 'Hip Hop / Rap / Hardcore Hip Hop', year: 2013, coverUrl: '/favorites/TheMarshallMathersLP2_2000x.webp', artistUrl: 'https://www.eminem.com/' },
{ album: 'The Pious Bird of Good Omen', artist: 'Fleetwood Mac', genre: 'Blues Rock / Rock / British Blues', year: 1969, coverUrl: '/favorites/ThePiousBirdOfGoodOmen_2000x.webp', artistUrl: 'https://www.fleetwoodmac.com/' },

{ album: 'The Wall', artist: 'Pink Floyd', genre: 'Progressive Rock / Art Rock / Rock Opera', year: 1979, coverUrl: '/favorites/TheWall_2000x.webp', artistUrl: 'https://www.pinkfloyd.com/' },
{ album: 'The Joshua Tree', artist: 'U2', genre: 'Rock / Alternative Rock / Post-Punk', year: 1987, coverUrl: '/favorites/U2THEJOSHUAT_2019-11-06_13-19-30_w6yvljgAai_2000x.webp', artistUrl: 'https://www.u2.com/' },
{ album: 'U218 Singles', artist: 'U2', genre: 'Rock / Alternative Rock', year: 2006, coverUrl: '/favorites/U2U218_2019-11-06_13-19-30_WHyc3KZPQd_2000x.webp', artistUrl: 'https://www.u2.com/' },
{ album: 'Serious Hits... Live!', artist: 'Phil Collins', genre: 'Pop Rock / Live Rock', year: 1990, coverUrl: '/favorites/philcollins.webp', artistUrl: 'https://www.philcollins.com/' },
{ album: 'Rubber Soul', artist: 'The Beatles', genre: 'Folk Rock / Pop Rock / Beat', year: 1965, coverUrl: '/favorites/rubbersoul.webp', artistUrl: 'https://www.thebeatles.com/' },

{ album: 'Glass Houses', artist: 'Billy Joel', genre: 'Rock / Pop Rock / New Wave', year: 1980, coverUrl: '/favorites/Y4LPBJ013.webp', artistUrl: 'https://www.billyjoel.com/' },









{ album: 'Nevermind', artist: 'Nirvana', genre: 'Grunge / Alternative Rock / Punk Rock', year: 1991, coverUrl: '/favorites/NIRVANANEVERMIND_2019-11-06_13-19-30_RdVlJQpXlo_2000x.webp', artistUrl: 'https://www.nirvana.com/' },
{ album: 'Now and Then', artist: 'The Beatles', genre: 'Rock / Pop Rock', year: 2023, coverUrl: '/favorites/nowandthen_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Number Ones', artist: 'Michael Jackson', genre: 'Pop / R&B / Dance Pop', year: 2003, coverUrl: '/favorites/NumberOnes_RedVinyl_2000x.webp', artistUrl: 'https://www.michaeljackson.com/' },
{ album: "Sgt. Pepper's Lonely Hearts Club Band", artist: 'The Beatles', genre: 'Psychedelic Rock / Pop Rock / Art Rock', year: 1967, coverUrl: '/favorites/peppers_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Pyramid', artist: 'The Alan Parsons Project', genre: 'Progressive Rock / Art Rock', year: 1978, coverUrl: '/favorites/Pyramid_HalfSpeed2024Remaster_Ltd.EditionClearVinyl_2000x.webp', artistUrl: 'https://alanparsons.com/' },
{ album: 'Recovery', artist: 'Eminem', genre: 'Hip Hop / Rap', year: 2010, coverUrl: '/favorites/Recovery_2000x.webp', artistUrl: 'https://www.eminem.com/' },
{ album: 'Californication', artist: 'Red Hot Chili Peppers', genre: 'Alternative Rock / Funk Rock', year: 1999, coverUrl: '/favorites/REDHOTCHILCALIFORNIC_2000x.webp', artistUrl: 'https://redhotchilipeppers.com/' },
{ album: 'The Graduate', artist: 'Simon & Garfunkel', genre: 'Folk Rock / Soundtrack', year: 1968, coverUrl: '/favorites/SIMONGARFUTHEGRADUAT_2000x.webp', artistUrl: 'https://www.simonandgarfunkel.com/' },
{ album: 'Led Zeppelin', artist: 'Led Zeppelin', genre: 'Hard Rock / Blues Rock', year: 1969, coverUrl: '/favorites/LEDZEPPELILEDZEPPELI_2019-11-06_13-19-30_tG5p3hilHI_2000x (1).webp', artistUrl: 'https://www.ledzeppelin.com/' },
{ album: 'Led Zeppelin II', artist: 'Led Zeppelin', genre: 'Hard Rock / Blues Rock', year: 1969, coverUrl: '/favorites/LEDZEPPELILEDZEPPELI2_2019-11-06_13-19-30_8lMRIP8S7S_2000x.webp', artistUrl: 'https://www.ledzeppelin.com/' },
{ album: 'Led Zeppelin III', artist: 'Led Zeppelin', genre: 'Hard Rock / Folk Rock / Blues Rock', year: 1970, coverUrl: '/favorites/LEDZEPPELILEDZEPPELI3_2000x.webp', artistUrl: 'https://www.ledzeppelin.com/' },
{ album: 'Led Zeppelin IV', artist: 'Led Zeppelin', genre: 'Hard Rock / Folk Rock / Classic Rock', year: 1971, coverUrl: '/favorites/LEDZEPPELILEDZEPPELI4_2000x.webp', artistUrl: 'https://www.ledzeppelin.com/' },
{ album: 'Mezzanine', artist: 'Massive Attack', genre: 'Trip Hop / Electronic / Alternative', year: 1998, coverUrl: '/favorites/MASSIVEATTMEZZANINE_2019-11-06_13-19-30_IHFNZ9rKeK_2000x.webp', artistUrl: 'https://massiveattack.co.uk/' },
{ album: 'Astral Weeks', artist: 'Van Morrison', genre: 'Folk Rock / Jazz Folk / Singer-Songwriter', year: 1968, coverUrl: '/favorites/MORRISONVAASTRALWEEK_2019-11-06_13-19-30_jIU4UI3C3L_2000x.webp', artistUrl: 'https://www.vanmorrison.com/' },
{ album: 'MTV Unplugged in New York', artist: 'Nirvana', genre: 'Acoustic Rock / Grunge / Alternative Rock', year: 1994, coverUrl: '/favorites/NIRVANAMTVUNPLUGG_2019-11-21_11-56-21_CXuQIIsQiK_2000x.webp', artistUrl: 'https://www.nirvana.com/' },
{ album: 'The Paul Simon Songbook', artist: 'Paul Simon', genre: 'Folk / Singer-Songwriter', year: 1965, coverUrl: '/favorites/SIMONPAULTHEPAULSIM_2000x.webp', artistUrl: 'https://www.paulsimon.com/' },
{ album: 'I Like It When You Sleep, for You Are So Beautiful Yet So Unaware of It', artist: 'The 1975', genre: 'Indie Pop / Pop Rock / Alternative Rock', year: 2016, coverUrl: '/favorites/i_like_it_when_you_sleep_2000x.webp', artistUrl: 'https://the1975.com/' },
{ album: 'Bad', artist: 'Michael Jackson', genre: 'Pop / R&B / Funk', year: 1987, coverUrl: '/favorites/JACKSONMICBAD_2019-11-06_13-19-30_0F6nDkHmq1_2000x.webp', artistUrl: 'https://www.michaeljackson.com/' },
{ album: 'Thriller', artist: 'Michael Jackson', genre: 'Pop / R&B / Funk / Disco', year: 1982, coverUrl: '/favorites/JACKSONMICTHRILLER_2019-11-06_13-19-30_puadCaL6Iy_2000x.webp', artistUrl: 'https://www.michaeljackson.com/' },
{ album: 'Diamonds', artist: 'Elton John', genre: 'Pop Rock / Glam Rock / Soft Rock', year: 2017, coverUrl: '/favorites/JOHNELTONDIAMONDS_2019-11-06_13-19-30_HpwWMWZW2b_2000x.webp', artistUrl: 'https://www.eltonjohn.com/' },
{ album: 'ARTPOP', artist: 'Lady Gaga', genre: 'Pop / EDM / Synthpop', year: 2013, coverUrl: '/favorites/LADYGAGAARTPOP_2000x.webp', artistUrl: 'https://www.ladygaga.com/' },
{ album: 'Blue Banisters', artist: 'Lana Del Rey', genre: 'Alternative Pop / Indie Pop / Baroque Pop', year: 2021, coverUrl: '/favorites/lana_2000x.webp', artistUrl: 'https://www.lanadelrey.com/' },
{ album: 'Hell Freezes Over', artist: 'Eagles', genre: 'Rock / Country Rock', year: 1994, coverUrl: '/favorites/EAGLESTHEHELLFREEZE_2019-11-06_13-19-30_JyGNq5VEwF_2000x.webp', artistUrl: 'https://eagles.com/' },
{ album: 'Hotel California', artist: 'Eagles', genre: 'Rock / Soft Rock', year: 1976, coverUrl: '/favorites/EAGLESTHEHOTELCALIF_2019-11-06_13-19-30_rkQILXzomY_2000x.webp', artistUrl: 'https://eagles.com/' },
{ album: 'Curtain Call: The Hits', artist: 'Eminem', genre: 'Hip Hop / Rap', year: 2005, coverUrl: '/favorites/EMINEMCURTAINCAL_2019-11-06_13-19-30_PzyUaWIpBG_2000x.webp', artistUrl: 'https://www.eminem.com/' },
{ album: 'The Marshall Mathers LP', artist: 'Eminem', genre: 'Hip Hop / Rap', year: 2000, coverUrl: '/favorites/EMINEMTHEMARSHAL_2019-11-06_13-19-30_wXqNb8IX4v_2000x.webp', artistUrl: 'https://www.eminem.com/' },
{ album: 'The Dance', artist: 'Fleetwood Mac', genre: 'Rock / Live Rock', year: 1997, coverUrl: '/favorites/FLEETWOODMTHEDANCE_2000x.webp', artistUrl: 'https://www.fleetwoodmac.com/' },
{ album: 'Tusk', artist: 'Fleetwood Mac', genre: 'Rock / Experimental Rock', year: 1979, coverUrl: '/favorites/FLEETWOODMTUSK_2000x.webp', artistUrl: 'https://www.fleetwoodmac.com/' },
{ album: 'Real Love', artist: 'The Beatles', genre: 'Rock / Pop Rock', year: 1996, coverUrl: '/favorites/FreeAsABirdRealLove_2025Mixes_MilkyWhiteVinyl_ExclusivetoTheRecordHubcom_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Appetite for Destruction', artist: "Guns N' Roses", genre: 'Hard Rock / Heavy Metal', year: 1987, coverUrl: '/favorites/GUNSNROSESAPPETITEFO_2000x.webp', artistUrl: 'https://www.gunsnroses.com/' },
{ album: 'Hozier', artist: 'Hozier', genre: 'Indie Rock / Soul', year: 2014, coverUrl: '/favorites/hozier2_2000x.webp', artistUrl: 'https://hozier.com/' },

// Bob Dylan
{ album: 'Blonde on Blonde', artist: 'Bob Dylan', genre: 'Folk Rock / Rock / Blues Rock', year: 1966, coverUrl: '/favorites/DYLANBOBBLONDEONBL_2019-11-06_13-19-30_lXhuszAZou_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },
{ album: 'Blood on the Tracks', artist: 'Bob Dylan', genre: 'Folk Rock / Singer-Songwriter', year: 1975, coverUrl: '/favorites/DYLANBOBBLOODONTHE_2019-11-06_13-19-30_x1tbQNsZmk_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },
{ album: 'Bringing It All Back Home', artist: 'Bob Dylan', genre: 'Folk Rock / Rock', year: 1965, coverUrl: '/favorites/DYLANBOBBRINGINGIT_2019-11-06_13-19-30_DVryI6IRm5_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },
{ album: 'Highway 61 Revisited', artist: 'Bob Dylan', genre: 'Folk Rock / Blues Rock', year: 1965, coverUrl: '/favorites/DYLANBOBHIGHWAY61R_2019-11-06_13-19-30_D2GTDgkuYq_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },
{ album: 'John Wesley Harding', artist: 'Bob Dylan', genre: 'Folk Rock / Country Rock', year: 1967, coverUrl: '/favorites/DYLANBOBJOHNWESLEY_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },
{ album: 'Nashville Skyline', artist: 'Bob Dylan', genre: 'Country Rock / Folk', year: 1969, coverUrl: '/favorites/DYLANBOBNASHVILLES_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },
{ album: 'Rough and Rowdy Ways', artist: 'Bob Dylan', genre: 'Folk Rock / Americana', year: 2020, coverUrl: '/favorites/DYLANBOBROUGHANDRO_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },
{ album: 'The Freewheelin’ Bob Dylan', artist: 'Bob Dylan', genre: 'Folk / Folk Rock', year: 1963, coverUrl: '/favorites/DYLANBOBTHEFREEWHE_2019-11-06_13-19-30_veu1El8rw9_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },
{ album: 'The Times They Are a-Changin’', artist: 'Bob Dylan', genre: 'Folk / Protest Folk', year: 1964, coverUrl: '/favorites/DYLANBOBTHETIMESTH_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },

// Depeche Mode / Dire Straits / Doors
{ album: 'Depeche Mode', artist: 'Depeche Mode', genre: 'Synth-pop / New Wave / Alternative', year: 1981, coverUrl: '/favorites/DepecheMode_2000x.webp', artistUrl: 'https://www.depechemode.com/' },
{ album: 'Music for the Masses', artist: 'Depeche Mode', genre: 'Synth-pop / Electronic Rock / New Wave', year: 1987, coverUrl: '/favorites/DEPECHEMODMUSICFORTH_2019-11-06_13-19-30_hoTBCAkjWx_2000x.webp', artistUrl: 'https://www.depechemode.com/' },
{ album: 'Songs of Faith and Devotion', artist: 'Depeche Mode', genre: 'Alternative Rock / Electronic Rock / Industrial', year: 1993, coverUrl: '/favorites/DEPECHEMODSONGSOFFAI_1_2000x.webp', artistUrl: 'https://www.depechemode.com/' },
{ album: 'Violator', artist: 'Depeche Mode', genre: 'Synth-pop / Electronic / Alternative', year: 1990, coverUrl: '/favorites/DEPECHEMODVIOLATOR_2019-11-06_13-19-30_hyNEJ3oXIW_2000x.webp', artistUrl: 'https://www.depechemode.com/' },
{ album: 'Brothers in Arms', artist: 'Dire Straits', genre: 'Rock / Roots Rock / Soft Rock', year: 1985, coverUrl: '/favorites/DIRESTRAITBROTHERSIN_2019-11-06_13-19-30_J4WmEqSyYO_2000x.webp', artistUrl: 'https://www.direstraits.com/' },
{ album: 'Communiqué', artist: 'Dire Straits', genre: 'Rock / Blues Rock / Roots Rock', year: 1979, coverUrl: '/favorites/DIRESTRAITCOMMUNIQUE_2019-12-02_12-47-16_WkcSC27CsQ_2000x.webp', artistUrl: 'https://www.direstraits.com/' },
{ album: 'Dire Straits', artist: 'Dire Straits', genre: 'Rock / Pub Rock / Blues Rock', year: 1978, coverUrl: '/favorites/DireStraits-DireStraits_2000x.webp', artistUrl: 'https://www.direstraits.com/' },
{ album: 'The Doors', artist: 'The Doors', genre: 'Psychedelic Rock / Blues Rock / Classic Rock', year: 1967, coverUrl: '/favorites/DOORSTHETHEDOORS_2019-11-06_13-19-30_xFca8BFTac_2000x.webp', artistUrl: 'https://www.thedoors.com/' },
{ album: 'Another Side of Bob Dylan', artist: 'Bob Dylan', genre: 'Folk Rock / Singer-Songwriter / Folk', year: 1964, coverUrl: '/favorites/DYLANBOBANOTHERSID_2000x.webp', artistUrl: 'https://www.bobdylan.com/' },

// Cranberries / Lana / Depeche Mode extended
{ album: 'Dreams: The Collection', artist: 'The Cranberries', genre: 'Alternative Rock / Pop Rock', year: 2012, coverUrl: '/favorites/CRANBERRIEDREAMS_2000x.webp', artistUrl: 'https://www.cranberries.com/' },
{ album: 'Born to Die', artist: 'Lana Del Rey', genre: 'Baroque Pop / Indie Pop', year: 2012, coverUrl: '/favorites/DELREYLANABORNTODIE_2019-11-06_13-19-30_bTr0VECRyb_2000x.webp', artistUrl: 'https://www.lanadelrey.com/' },
{ album: 'Norman Fucking Rockwell!', artist: 'Lana Del Rey', genre: 'Indie Pop / Art Pop', year: 2019, coverUrl: '/favorites/DELREYLANANFR_2000x.webp', artistUrl: 'https://www.lanadelrey.com/' },
{ album: 'Ultraviolence', artist: 'Lana Del Rey', genre: 'Dream Pop / Alternative Rock', year: 2014, coverUrl: '/favorites/DELREYLANAULTRAVIOLE_2000x.webp', artistUrl: 'https://www.lanadelrey.com/' },
{ album: 'Memento Mori', artist: 'Depeche Mode', genre: 'Synth-Pop / Alternative Electronic', year: 2023, coverUrl: '/favorites/depeche_2000x.webp', artistUrl: 'https://www.depechemode.com/' },
{ album: 'A Broken Frame', artist: 'Depeche Mode', genre: 'Synth-Pop / New Wave', year: 1982, coverUrl: '/favorites/DEPECHEMODABROKENFRA_2000x.webp', artistUrl: 'https://www.depechemode.com/' },
{ album: 'Black Celebration', artist: 'Depeche Mode', genre: 'Synth-Pop / Dark Wave', year: 1986, coverUrl: '/favorites/DEPECHEMODBLACKCELEB_2019-11-06_13-19-30_c75kzldpkh_2000x.webp', artistUrl: 'https://www.depechemode.com/' },

// Beatles / Bowie / Kate Bush / Floyd / Beach Boys / comps
{ album: 'Love', artist: 'The Beatles', genre: 'Pop / Rock', year: 2006, coverUrl: '/favorites/BEATLESTHELOVE_2019-11-06_13-19-30_SpQCV7NH8F_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Magical Mystery Tour', artist: 'The Beatles', genre: 'Psychedelic Pop / Rock', year: 1967, coverUrl: '/favorites/BEATLESTHEMAGICALMYS_2019-11-06_13-19-30_c3q47j1lzl_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Please Please Me', artist: 'The Beatles', genre: 'Rock and Roll / Merseybeat', year: 1963, coverUrl: '/favorites/BEATLESTHEPLEASEPLEA_2019-11-06_13-19-30_tUtAZrCN4W_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'With The Beatles', artist: 'The Beatles', genre: 'Rock / Beat', year: 1963, coverUrl: '/favorites/BEATLESTHEWITHTHEBEA_2019-11-06_13-19-30_hpXuZnh9tT_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Yellow Submarine', artist: 'The Beatles', genre: 'Psychedelic Rock', year: 1969, coverUrl: '/favorites/BEATLESTHEYELLOWSUBM_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Yellow Submarine', artist: 'The Beatles', genre: 'Psychedelic Rock', year: 1969, coverUrl: '/favorites/BEATLESTHEYELLOWSUBM_2019-11-06_13-19-30_UjeFNYxYio_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },

{ album: 'Happier Than Ever', artist: 'Billie Eilish', genre: 'Alternative Pop / Indie', year: 2021, coverUrl: '/favorites/billie_1_2000x.webp', artistUrl: 'https://www.billieeilish.com/' },
{ album: 'ChangesOneBowie', artist: 'David Bowie', genre: 'Rock / Glam Rock', year: 1976, coverUrl: '/favorites/BOWIEDAVIDCHANGESONE_2000x.webp', artistUrl: 'https://www.davidbowie.com/' },
{ album: 'Hunky Dory', artist: 'David Bowie', genre: 'Art Rock / Pop Rock', year: 1971, coverUrl: '/favorites/BOWIEDAVIDHUNKYDORY_2000x.webp', artistUrl: 'https://www.davidbowie.com/' },
{ album: 'Hounds of Love', artist: 'Kate Bush', genre: 'Art Pop / Experimental Pop', year: 1985, coverUrl: '/favorites/BUSHKATEHOUNDSOFLO_2019-11-06_13-19-30_Kn7NairWHt_2000x.webp', artistUrl: 'https://www.katebush.com/' },

{ album: 'Atom Heart Mother', artist: 'Pink Floyd', genre: 'Progressive Rock / Psychedelic Rock', year: 1970, coverUrl: '/favorites/AtomHeartMother_2000x.webp', artistUrl: 'https://www.pinkfloyd.com/' },
{ album: 'Pet Sounds', artist: 'The Beach Boys', genre: 'Baroque Pop / Psychedelic Pop', year: 1966, coverUrl: '/favorites/BEACHBOYSTPETSOUNDS_2019-11-06_13-19-30_x9LiJmn5qO_2000x.webp', artistUrl: 'https://thebeachboys.com/' },
{ album: '1962–1966', artist: 'The Beatles', genre: 'Rock / Pop Rock', year: 1973, coverUrl: '/favorites/beatles2_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: '1967–1970', artist: 'The Beatles', genre: 'Rock / Pop Rock', year: 1973, coverUrl: '/favorites/beatles1_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: '1', artist: 'The Beatles', genre: 'Rock / Pop', year: 2000, coverUrl: '/favorites/BEATLESTHE1_2019-11-06_13-19-30_qR13sSg0jh_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: "A Hard Day's Night", artist: 'The Beatles', genre: 'Rock / Beat', year: 1964, coverUrl: '/favorites/BEATLESTHEAHARDDAYSN_2019-11-06_13-19-30_yjWtdTS8bk_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
{ album: 'Beatles for Sale', artist: 'The Beatles', genre: 'Rock / Folk Rock', year: 1964, coverUrl: '/favorites/BEATLESTHEBEATLESFOR_2019-11-06_13-19-30_mCX1Glmqes_2000x.webp', artistUrl: 'https://www.thebeatles.com/' }

// { album: 'Led Zeppelin II', artist: 'Led Zeppelin', genre: 'Hard Rock / Blues Rock / Heavy Rock', year: 1969, coverUrl: '/favorites/LEDZEPPELIINTHROUGHT_2000x.webp', artistUrl: 'https://www.ledzeppelin.com/' },
// { album: 'Led Zeppelin', artist: 'Led Zeppelin', genre: 'Hard Rock / Blues Rock / Heavy Rock', year: 1969, coverUrl: '/favorites/LEDZEPPELILEDZEPPELI_2000x.webp', artistUrl: 'https://www.ledzeppelin.com/' },
// { album: 'Violator', artist: 'Depeche Mode', genre: 'Synth-Pop / Electronic Rock', year: 1990, coverUrl: '/favorites/depeche-mode-violator.png', artistUrl: 'https://www.depechemode.com/' },
// { album: 'Songs of Faith and Devotion', artist: 'Depeche Mode', genre: 'Alternative Rock / Electronic', year: 1993, coverUrl: '/favorites/depeche-mode-songs-of-faith-and-devotion.png', artistUrl: 'https://www.depechemode.com/' },
// { album: 'Music for the Masses', artist: 'Depeche Mode', genre: 'Synth-Pop / New Wave', year: 1987, coverUrl: '/favorites/depeche-mode-music-for-the-masses.png', artistUrl: 'https://www.depechemode.com/' },
// { album: 'Wish You Were Here', artist: 'Pink Floyd', genre: 'Progressive Rock / Psychedelic Rock / Art Rock', year: 1975, coverUrl: '/favorites/PINK_2000x.webp', artistUrl: 'https://www.pinkfloyd.com/' },
// { album: 'Let It Be', artist: 'The Beatles', genre: 'Rock / Pop Rock / Gospel Rock', year: 1970, coverUrl: '/favorites/letitbe_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },
// { album: 'An Innocent Man', artist: 'Billy Joel', genre: 'Pop / Blue-Eyed Soul / Soft Rock', year: 1983, coverUrl: '/favorites/innocentb_2000x.webp', artistUrl: 'https://www.billyjoel.com/' },
// { album: 'Piano Man', artist: 'Billy Joel', genre: 'Piano Rock / Pop Rock / Singer-Songwriter', year: 1973, coverUrl: '/favorites/JOELBILLYPIANOMAN_2000x.webp', artistUrl: 'https://www.billyjoel.com/' },
// { album: 'Tango in the Night', artist: 'Fleetwood Mac', genre: 'Pop Rock / Soft Rock', year: 1987, coverUrl: '/favorites/fleetwood-mac-tango-in-the-night.png', artistUrl: 'https://www.fleetwoodmac.com/' },
// { album: 'Yellow Submarine (Soundtrack)', artist: 'The Beatles', genre: 'Psychedelic Rock / Soundtrack', year: 1969, coverUrl: '/mnt/data/BEATLESTHEYELLOWSUBM_2000x.webp', artistUrl: 'https://www.thebeatles.com/' },




  // {
  // { album: 'Rumours', artist: 'Fleetwood Mac', genre: 'Soft Rock / Pop Rock / Adult Contemporary', year: 1977, coverUrl: '/favorites/Rumours_2000x.webp', artistUrl: 'https://www.fleetwoodmac.com/' },
// { album: 'Rumours', artist: 'Fleetwood Mac', genre: 'Soft Rock / Pop Rock / Adult Contemporary', year: 1977, coverUrl: '/favorites/fm.jpg', artistUrl: 'https://www.fleetwoodmac.com/' },
// { album: 'Saviors', artist: 'Green Day', genre: 'Punk Rock / Alternative Rock / Pop Punk', year: 2024, coverUrl: '/favorites/savior-g.jpg', artistUrl: 'https://www.greenday.com/' },
// { album: 'Saviors', artist: 'Green Day', genre: 'Punk Rock / Alternative Rock / Pop Punk', year: 2024, coverUrl: '/favorites/saviors-gd.jpg', artistUrl: 'https://www.greenday.com/' },
// { album: '...But Seriously', artist: 'Phil Collins', genre: 'Pop Rock / Soft Rock / Adult Contemporary', year: 1989, coverUrl: '/favorites/phil-collins---but-seriously-exploded-2lp_edit.jpg', artistUrl: 'https://www.philcollins.com/' },
// { album: 'Father of All…', artist: 'Green Day', genre: 'Garage Rock / Pop Punk / Alternative Rock', year: 2020, coverUrl: '/favorites/fatherofall.jpg', artistUrl: 'https://www.greenday.com/' },
// { album: 'Revolver', artist: 'The Beatles', genre: 'Psychedelic Rock / Pop Rock / Art Rock', year: 1966, coverUrl: '/favorites/TheBeatles-Revolver-SpecialEditionLPVinyl.webp', artistUrl: 'https://www.thebeatles.com/' },
// { album: 'The Stranger', artist: 'Billy Joel', genre: 'Pop Rock / Piano Rock / Soft Rock', year: 1977, coverUrl: '/favorites/71LDLZ+cQIL._UF1000,1000_QL80_.jpg', artistUrl: 'https://www.billyjoel.com/' },

  //   album: 'Warning:',
  //   artist: 'Green Day',
  //   genre: 'Punk Rock / Pop Punk',
  //   year: 2000,
  //   coverUrl: '/favorites/green-day-warning.png',
  //   artistUrl: 'https://www.greenday.com/',
  // },
  // {
  //   album: 'American Idiot',
  //   artist: 'Green Day',
  //   genre: 'Punk Rock / Pop Punk',
  //   year: 2004,
  //   coverUrl: '/favorites/green-day-american-idiot.png',
  //   artistUrl: 'https://www.greenday.com/',
  // },
  
  
  
  // { album: 'Random Access Memories', artist: 'Daft Punk', coverUrl: 'https://picsum.photos/seed/ram/400/400', artistUrl: 'https://www.daftpunk.com/' },
  // { album: 'Blonde', artist: 'Frank Ocean', coverUrl: 'https://picsum.photos/seed/blonde/400/400', artistUrl: 'https://frankocean.com/' },
  // { album: 'Currents', artist: 'Tame Impala', coverUrl: 'https://picsum.photos/seed/currents/400/400', artistUrl: 'https://www.tameimpala.com/' },
  // { album: 'In Rainbows', artist: 'Radiohead', coverUrl: 'https://picsum.photos/seed/inrainbows/400/400', artistUrl: 'https://www.radiohead.com/' },
  // { album: 'The Dark Side of the Moon', artist: 'Pink Floyd', coverUrl: 'https://picsum.photos/seed/darkside/400/400', artistUrl: 'https://www.pinkfloyd.com/' },
  // { album: 'Abbey Road', artist: 'The Beatles', coverUrl: 'https://picsum.photos/seed/abbey/400/400', artistUrl: 'https://www.thebeatles.com/' },
  // { album: 'Kind of Blue', artist: 'Miles Davis', coverUrl: 'https://picsum.photos/seed/kindofblue/400/400', artistUrl: 'https://www.milesdavis.com/' },
  // { album: 'Discovery', artist: 'Daft Punk', coverUrl: 'https://picsum.photos/seed/discovery/400/400', artistUrl: 'https://www.daftpunk.com/' },
  // { album: 'Warning:', artist: 'Green Day', coverUrl: '/favorites/green-day-warning.png', artistUrl: 'https://www.greenday.com/' },
  // { album: 'American Idiot', artist: 'Green Day', coverUrl: '/favorites/green-day-american-idiot.png', artistUrl: 'https://www.greenday.com/' },
  // { album: 'Random Access Memories', artist: 'Daft Punk', coverUrl: 'https://picsum.photos/seed/ram/400/400', artistUrl: 'https://www.daftpunk.com/' },
  // { album: 'Blonde', artist: 'Frank Ocean', coverUrl: 'https://picsum.photos/seed/blonde/400/400', artistUrl: 'https://frankocean.com/' },
  // { album: 'Currents', artist: 'Tame Impala', coverUrl: 'https://picsum.photos/seed/currents/400/400', artistUrl: 'https://www.tameimpala.com/' },
  // { album: 'In Rainbows', artist: 'Radiohead', coverUrl: 'https://picsum.photos/seed/inrainbows/400/400', artistUrl: 'https://www.radiohead.com/' },
  // { album: 'The Dark Side of the Moon', artist: 'Pink Floyd', coverUrl: 'https://picsum.photos/seed/darkside/400/400', artistUrl: 'https://www.pinkfloyd.com/' },
  // { album: 'Abbey Road', artist: 'The Beatles', coverUrl: 'https://picsum.photos/seed/abbey/400/400', artistUrl: 'https://www.thebeatles.com/' },
  // { album: 'Kind of Blue', artist: 'Miles Davis', coverUrl: 'https://picsum.photos/seed/kindofblue/400/400', artistUrl: 'https://www.milesdavis.com/' },
  // { album: 'Discovery', artist: 'Daft Punk', coverUrl: 'https://picsum.photos/seed/discovery/400/400', artistUrl: 'https://www.daftpunk.com/' },
  // { album: 'Warning:', artist: 'Green Day', coverUrl: '/favorites/green-day-warning.png', artistUrl: 'https://www.greenday.com/' },
  // { album: 'American Idiot', artist: 'Green Day', coverUrl: '/favorites/green-day-american-idiot.png', artistUrl: 'https://www.greenday.com/' },
  // { album: 'Random Access Memories', artist: 'Daft Punk', coverUrl: 'https://picsum.photos/seed/ram/400/400', artistUrl: 'https://www.daftpunk.com/' },
  // { album: 'Blonde', artist: 'Frank Ocean', coverUrl: 'https://picsum.photos/seed/blonde/400/400', artistUrl: 'https://frankocean.com/' },
  // { album: 'Currents', artist: 'Tame Impala', coverUrl: 'https://picsum.photos/seed/currents/400/400', artistUrl: 'https://www.tameimpala.com/' },
  // { album: 'In Rainbows', artist: 'Radiohead', coverUrl: 'https://picsum.photos/seed/inrainbows/400/400', artistUrl: 'https://www.radiohead.com/' },
  // { album: 'The Dark Side of the Moon', artist: 'Pink Floyd', coverUrl: 'https://picsum.photos/seed/darkside/400/400', artistUrl: 'https://www.pinkfloyd.com/' },
  // { album: 'Abbey Road', artist: 'The Beatles', coverUrl: 'https://picsum.photos/seed/abbey/400/400', artistUrl: 'https://www.thebeatles.com/' },
  // { album: 'Kind of Blue', artist: 'Miles Davis', coverUrl: 'https://picsum.photos/seed/kindofblue/400/400', artistUrl: 'https://www.milesdavis.com/' },
  // { album: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', coverUrl: 'https://picsum.photos/seed/tpab/400/400', artistUrl: 'https://www.kendricklamar.com/' },
  // { album: 'Good Kid, M.A.A.D City', artist: 'Kendrick Lamar', coverUrl: 'https://picsum.photos/seed/gkmc/400/400', artistUrl: 'https://www.kendricklamar.com/' },
  // { album: 'The Suburbs', artist: 'Arcade Fire', coverUrl: 'https://picsum.photos/seed/suburbs/400/400', artistUrl: 'https://arcadefire.com/' },
  // { album: 'Lemonade', artist: 'Beyoncé', coverUrl: 'https://picsum.photos/seed/lemonade/400/400', artistUrl: 'https://www.beyonce.com/' },
  // { album: 'Channel Orange', artist: 'Frank Ocean', coverUrl: 'https://picsum.photos/seed/channel/400/400', artistUrl: 'https://frankocean.com/' },
  // { album: 'The Low End Theory', artist: 'A Tribe Called Quest', coverUrl: 'https://picsum.photos/seed/lowend/400/400', artistUrl: 'https://atribecalledquest.com/' },
  // { album: 'Illmatic', artist: 'Nas', coverUrl: 'https://picsum.photos/seed/illmatic/400/400', artistUrl: 'https://www.nasirjones.com/' },
  // { album: 'Rumours', artist: 'Fleetwood Mac', coverUrl: 'https://picsum.photos/seed/rumours/400/400', artistUrl: 'https://www.fleetwoodmac.com/' },
  // { album: 'Thriller', artist: 'Michael Jackson', coverUrl: 'https://picsum.photos/seed/thriller/400/400', artistUrl: 'https://www.michaeljackson.com/' },
  // { album: 'Back to Black', artist: 'Amy Winehouse', coverUrl: 'https://picsum.photos/seed/backtoblack/400/400', artistUrl: 'https://www.amywinehouse.com/' },
  // { album: '21', artist: 'Adele', coverUrl: 'https://picsum.photos/seed/adele21/400/400', artistUrl: 'https://www.adele.com/' },
  // { album: 'Nevermind', artist: 'Nirvana', coverUrl: 'https://picsum.photos/seed/nevermind/400/400', artistUrl: 'https://www.nirvana.com/' },
  // { album: 'OK Computer', artist: 'Radiohead', coverUrl: 'https://picsum.photos/seed/okcomputer/400/400', artistUrl: 'https://www.radiohead.com/' },
  // { album: 'The Rise and Fall of Ziggy Stardust', artist: 'David Bowie', coverUrl: 'https://picsum.photos/seed/ziggy/400/400', artistUrl: 'https://www.davidbowie.com/' },
];

const BOOKS: {
  title: string;
  author: string;
  year?: number;
  genre?: string;
  format?: string;
  /** Optional. Use when ISBN cover fails—e.g. path to image in public folder: "/favorites/books/MyCover.jpg" */
  coverUrl?: string;
  isbn?: string;
  publisherUrl?: string;
}[] = [
  { title: 'Irresistible Change: A Blueprint for Earning Buy-In and Breakout Success', author: 'Phil Gilbert', year: 2025, genre: 'Business / Leadership', format: 'Non-fiction', isbn: '1394367759', coverUrl: '/favorites/books/Irresistible Change_.png' },
  { title: 'Tim: The Official Biography of Avicii', author: 'Måns Mosesson', year: 2024, genre: 'Biography / Music', format: 'Non-fiction', isbn: '9780751579017', coverUrl: '/favorites/books/tim.png'  },
{ title: 'Atomic Habits', author: 'James Clear', year: 2018, genre: 'Self-help / Productivity', format: 'Non-fiction', isbn: '0735211299' },
{ title: 'The Curious Incident of the Dog in the Night-Time', author: 'Mark Haddon', year: 2003, genre: 'Mystery / Coming-of-age', format: 'Fiction', isbn: '1400032717' },
{ title: 'How to Win Friends & Influence People', author: 'Dale Carnegie', year: 1936, genre: 'Self-help / Communication', format: 'Non-fiction', isbn: '0671027034' },
{ title: "Why Men Don't Listen & Women Can't Read Maps", author: 'Allan Pease & Barbara Pease', year: 1998, genre: 'Psychology / Relationships', format: 'Non-fiction', isbn: '0767907639' },
{ title: 'The Fountainhead', author: 'Ayn Rand', year: 1943, genre: 'Philosophical / Drama', format: 'Fiction', isbn: '0451191153' },
{ title: 'Atlas Shrugged', author: 'Ayn Rand', year: 1957, genre: 'Philosophical / Political', format: 'Fiction', isbn: '0451191145' },
{ title: 'Steve Jobs', author: 'Walter Isaacson', year: 2011, genre: 'Biography / Business', format: 'Non-fiction', isbn: '1451648537' },
{ title: 'Artemis Fowl', author: 'Eoin Colfer', year: 2001, genre: 'Fantasy / Young Adult', format: 'Fiction', isbn: '0786817070' },
{ title: 'The Five People You Meet in Heaven', author: 'Mitch Albom', year: 2003, genre: 'Inspirational / Drama', format: 'Fiction', isbn: '1401308589' },
{ title: "The Hitchhiker's Guide to the Galaxy (Illustrated Edition)", author: 'Douglas Adams', year: 1979, genre: 'Science Fiction / Comedy', format: 'Fiction', isbn: '1405280341', coverUrl: '/favorites/books/Hitchhiker.png' },
{ title: 'The Da Vinci Code', author: 'Dan Brown', year: 2003, genre: 'Mystery / Thriller', format: 'Fiction', isbn: '0307474275' },
{ title: 'Angels & Demons', author: 'Dan Brown', year: 2000, genre: 'Mystery / Thriller', format: 'Fiction', isbn: '074349346X' },
{ title: 'Inferno', author: 'Dan Brown', year: 2013, genre: 'Mystery / Thriller', format: 'Fiction', isbn: '1400079152' },
{ title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', year: 1997, genre: 'Fantasy / Young Adult', format: 'Fiction', isbn: '059035342X' },
{ title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', year: 1998, genre: 'Fantasy / Young Adult', format: 'Fiction', isbn: '0439064872' },
{ title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', year: 1999, genre: 'Fantasy / Young Adult', format: 'Fiction', isbn: '0439136369' },
{ title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling', year: 2000, genre: 'Fantasy / Young Adult', format: 'Fiction', isbn: '0439139600' },
{ title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling', year: 2003, genre: 'Fantasy / Young Adult', format: 'Fiction', isbn: '0439358078' },
{ title: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling', year: 2005, genre: 'Fantasy / Young Adult', format: 'Fiction', isbn: '0439785960' },
{ title: 'Harry Potter and the Deathly Hallows', author: 'J.K. Rowling', year: 2007, genre: 'Fantasy / Young Adult', format: 'Fiction', isbn: '0545010225' },
{ title: 'Your Prime Minister is Dead', author: 'Anuj Dhar', year: 2018, genre: 'History / Political Investigation', format: 'Non-fiction', isbn: '9386473356' },
{ title: "The Hitchhiker’s Guide to the Galaxy", author: 'Douglas Adams', year: 1979, genre: 'Science Fiction / Comedy', format: 'Fiction', isbn: '0345391802' },
{ title: 'What Happened to Netaji', author: 'Anuj Dhar', year: 2015, genre: 'History / Political Investigation', format: 'Non-fiction', isbn: '9382711880', coverUrl: '/favorites/books/Frame1312318260.png' },
{ title: 'No Secrets', author: 'Anuj Dhar', year: 2013, genre: 'History / Political Investigation', format: 'Non-fiction', isbn: '9382711058', coverUrl: '/favorites/books/nosecret.png'   },
{ title: 'The Hidden Hindu', author: 'Akshat Gupta', year: 2021, genre: 'Mythology / Thriller', format: 'Fiction', isbn: '0143455699', coverUrl: '/favorites/books/hh1.png'  },
{ title: 'The Hidden Hindu 2', author: 'Akshat Gupta', year: 2022, genre: 'Mythology / Thriller', format: 'Fiction', isbn: '0143462288', coverUrl: '/favorites/books/hh2.png'  },
{ title: 'The Hidden Hindu 3', author: 'Akshat Gupta', year: 2023, genre: 'Mythology / Thriller', format: 'Fiction', isbn: '0143465481', coverUrl: '/favorites/books/hh3.png'  },
{ title: 'The Naga Warriors 1: Battle of Gokul Vol 1', author: 'Akshat Gupta', year: 2023, genre: 'Mythology / Historical Fiction', format: 'Fiction', isbn: '9356294196', coverUrl: '/favorites/books/naga1.png'  }, 
// { title: 'Arya: The Courageous Boy (Series Book 1)', author: 'Akshat Gupta', year: 2022, genre: 'Children / Mythology', format: 'Fiction', isbn: '9391019150' },
// { title: 'Hidden Hindu Secrets (Parts 1–3, Hindi Edition)', author: 'Akshat Gupta', year: 2023, genre: 'Mythology / Spiritual', format: 'Fiction', isbn: '9356296822' },
// { title: 'Tim: The Official Biography of Avicii', author: 'Måns Mosesson', year: 2023, genre: 'Biography / Music', format: 'Non-fiction', isbn: '0751579017' },
{ title: 'The Alchemist', author: 'Paulo Coelho', year: 1988, genre: 'Philosophical / Adventure', format: 'Fiction', isbn: '0061122416' },
{ title: 'Blink: The Power of Thinking Without Thinking', author: 'Malcolm Gladwell', year: 2005, genre: 'Psychology / Decision Making', format: 'Non-fiction', isbn: '0316010669' },
{ title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: 2011, genre: 'Psychology / Behavioral Economics', format: 'Non-fiction', isbn: '0374533555' },
{ title: 'The Odyssey', author: 'Homer', year: -700, genre: 'Epic / Classical Literature', format: 'Fiction', isbn: '0140268863' },
{ title: "India's Biggest Cover Up", author: 'Anuj Dhar', year: 2012, genre: 'History / Political Investigation', format: 'Non-fiction', isbn: '9380828691', coverUrl: '/favorites/books/india.png'  },
{ title: "Government Doesn't Want You To Know This", author: 'Chandrachur Ghose & Anuj Dhar', year: 2021, genre: 'History / Political Investigation', format: 'Non-fiction', isbn: '8194964059', coverUrl: '/favorites/books/govt.png'  },
{ title: 'Back from the Dead: Inside the Subhas Bose Mystery', author: 'Anuj Dhar', year: 2005, genre: 'History / Investigation', format: 'Non-fiction', isbn: '8170492378', coverUrl: '/favorites/books/back.png'  },
{ title: 'Conundrum', author: 'Chandrachur Ghose & Anuj Dhar', year: 2019, genre: 'History / Political', format: 'Non-fiction', isbn: '9386473577' },


// { title: 'The Fountainhead', author: 'Ayn Rand', year: 1943, genre: 'Philosophical / Drama', format: 'Fiction', isbn: '0451191153' },



// { title: 'Atomic Habits', author: 'James Clear', year: 2018, genre: 'Self-help / Productivity', format: 'Non-fiction', isbn: '0735211299' },
//   { title: 'Deep Work', author: 'Cal Newport', year: 2016, genre: 'Productivity / Career', format: 'Non-fiction', isbn: '1455586692' },
//   { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', year: 2011, genre: 'Psychology / Behavioral Economics', format: 'Non-fiction', isbn: '0374533555' },
//   { title: 'Zero to One', author: 'Peter Thiel', year: 2014, genre: 'Business / Startups', format: 'Non-fiction', isbn: '0804139296' },
//   { title: 'The Lean Startup', author: 'Eric Ries', year: 2011, genre: 'Business / Entrepreneurship', format: 'Non-fiction', isbn: '0307887898' },
//   { title: 'Inspired', author: 'Marty Cagan', year: 2017, genre: 'Product Management / Product', format: 'Non-fiction', isbn: '1119387507' },
  // { title: 'The Design of Everyday Things', author: 'Don Norman', isbn: '0465050654' },
  // { title: "Don't Make Me Think", author: 'Steve Krug', isbn: '0321344758' },
  // { title: 'Steal Like an Artist', author: 'Austin Kleon', isbn: '0761169253' },
  // { title: 'Sprint', author: 'Jake Knapp', isbn: '1501163404' },
  // { title: 'Hooked', author: 'Nir Eyal', isbn: '0316230878' },// { title: 'Refactoring', author: 'Martin Fowler', isbn: '0134757599' },
  // { title: 'Clean Code', author: 'Robert C. Martin', isbn: '0132350882' },
  // { title: 'The Mom Test', author: 'Rob Fitzpatrick', isbn: '1492180742' },
  // { title: 'Contagious', author: 'Jonah Berger', isbn: '1451686579' },
  // { title: 'Made to Stick', author: 'Chip Heath', isbn: '1400064287' },
  // { title: 'Creativity, Inc.', author: 'Ed Catmull', isbn: '0812993012' },
  // { title: 'Shape Up', author: 'Ryan Singer', isbn: '0578573962' },
  // { title: 'The Elements of User Experience', author: 'Jesse James Garrett', isbn: '0321683684' },
  // { title: 'Articulating Design Decisions', author: 'Tom Greever', isbn: '1491921562' },
  // { title: 'Designing for the Digital Age', author: 'Kim Goodwin', isbn: '0470229101' },
];

function getCoverUrl(book: (typeof BOOKS)[0]): string {
  // coverUrl takes precedence (use for local/custom images when ISBN fetch fails)
  if (book.coverUrl) return book.coverUrl;
  if (book.isbn) return `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;
  return '';
}

function MusicCard({ item }: { item: (typeof MUSIC)[0] }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const showImage = !coverFailed;

  return (
    <div className="group flex flex-col rounded-none overflow-hidden border border-black/[0.06] bg-white shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-1 hover:border-black/[0.08] cursor-default">
      {/* Square light grey box - same as books. LP/album cover inside. */}
      <div
        className="w-full aspect-square flex items-center justify-center rounded-none overflow-hidden p-1 md:p-1.5 bg-[#F8F8F8] border border-gray-200/80 transition-colors duration-300 group-hover:border-gray-300"
        style={{ backgroundColor: '#F8F8F8' }}
      >
        {showImage ? (
          <img
            src={item.coverUrl}
            alt={item.album}
            className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            onError={() => setCoverFailed(true)}
          />
        ) : (
          <span className="text-gray-400 text-4xl font-serif">
            {item.album.charAt(0)}
          </span>
        )}
      </div>
      {/* Album name, artist, and Visit Artist - same layout as books */}
      <div className="flex flex-row items-start justify-between gap-4 mt-3 md:mt-4 px-4 pb-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] md:text-[16px] font-semibold text-gray-900 leading-snug transition-opacity duration-300 group-hover:opacity-80">
            {item.album}
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 mt-1 font-normal">
            {item.artist}
          </p>
          <div className="mt-0.5 flex flex-col text-[12px] md:text-[13px] text-gray-400 gap-0.5">
            <span>Genre: {item.genre}</span>
            <span>Year: {item.year}</span>
          </div>
        </div>
        <a
          href={item.artistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-[11px] md:text-[12px] tracking-wide text-gray-400 hover:text-gray-700 transition-colors whitespace-nowrap uppercase"
        >
          Visit Artist →
        </a>
      </div>
    </div>
  );
}

function BookCard({ book }: { book: (typeof BOOKS)[0] }) {
  const coverUrl = getCoverUrl(book);
  const [coverFailed, setCoverFailed] = useState(false);
  const showImage = coverUrl && !coverFailed;
  const publisherLink = book.publisherUrl ?? (book.isbn ? `https://openlibrary.org/isbn/${book.isbn}` : '#');

  return (
    <div className="group flex flex-col rounded-none overflow-hidden border border-black/[0.06] bg-white shadow-[var(--shadow-card)] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:shadow-[var(--shadow-depth)] hover:-translate-y-1 hover:border-black/[0.08] cursor-default">
      {/* Square light grey box - same for all books. Minimal padding so all book images appear the same size. */}
      <div
        className="w-full aspect-square flex items-center justify-center rounded-none overflow-hidden p-1 md:p-1.5 bg-[#F8F8F8] border border-gray-200/80 transition-colors duration-300 group-hover:border-gray-300"
        style={{ backgroundColor: '#F8F8F8' }}
      >
        {showImage ? (
          <img
            src={encodeURI(coverUrl)}
            alt={book.title}
            className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            onError={() => setCoverFailed(true)}
          />
        ) : (
          <span className="text-gray-400 text-4xl font-serif">
            {book.title.charAt(0)}
          </span>
        )}
      </div>
      {/* Title, author, year, genre, format, and Visit Publisher */}
      <div className="flex flex-row items-start justify-between gap-4 mt-3 md:mt-4 px-4 pb-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-[15px] md:text-[16px] font-semibold text-gray-900 leading-snug transition-opacity duration-300 group-hover:opacity-80">
            {book.title}
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray-500 mt-1 font-normal">
            {book.author}
          </p>
          <div className="mt-0.5 flex flex-col text-[12px] md:text-[13px] text-gray-400 gap-0.5">
            {book.year != null && <span>Year: {book.year}</span>}
            {book.genre && <span>Genre: {book.genre}</span>}
            {book.format && <span>Format: {book.format}</span>}
          </div>
        </div>
        <a
          href={publisherLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-[11px] md:text-[12px] tracking-wide text-gray-400 hover:text-gray-700 transition-colors whitespace-nowrap uppercase"
        >
          Visit Publisher →
        </a>
      </div>
    </div>
  );
}

const PAGE_SIZE = 15;

export function FavoritesPage() {
  const [musicVisible, setMusicVisible] = useState(PAGE_SIZE);
  const [booksVisible, setBooksVisible] = useState(PAGE_SIZE);

  const visibleMusic = MUSIC.slice(0, musicVisible);
  const visibleBooks = BOOKS.slice(0, booksVisible);
  const hasMoreMusic = musicVisible < MUSIC.length;
  const hasMoreBooks = booksVisible < BOOKS.length;

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 pt-24 pb-16">
        {/* Favorite music - same layout as Favorite books */}
        <h2 className="text-[13px] tracking-[0.15em] text-gray-400 uppercase mb-12 md:mb-16">
          Favorite music
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-start mb-8">
          {visibleMusic.map((item, index) => (
            <MusicCard key={`${item.album}-${item.artist}-${index}`} item={item} />
          ))}
        </div>
        {hasMoreMusic && (
          <div className="flex justify-center mb-20 md:mb-24">
            <button
              type="button"
              onClick={() => setMusicVisible((n) => n + PAGE_SIZE)}
              className="text-[17px] text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded py-2 px-1"
            >
              Load more music →
            </button>
          </div>
        )}
        {!hasMoreMusic && MUSIC.length > PAGE_SIZE && <div className="mb-20 md:mb-24" />}

        {/* Favorite books */}
        <h1 className="text-[13px] tracking-[0.15em] text-gray-400 uppercase mb-12 md:mb-16">
          Favorite books
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-start mb-8">
          {visibleBooks.map((book) => (
            <BookCard key={`${book.title}-${book.author}`} book={book} />
          ))}
        </div>
        {hasMoreBooks && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setBooksVisible((n) => n + PAGE_SIZE)}
              className="text-[17px] text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded py-2 px-1"
            >
              Load more books →
            </button>
          </div>
        )}
      </div>

      {/* Footer - same as FriendsPage / HomePage */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12">
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-12 pb-8 text-[13px] text-gray-500"
          data-footer
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap">Designed and Developed.</span>
            <span>© 2026</span>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <a href="https://www.figma.com/@iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Figma">
              <Figma className="w-[18px] h-[18px]" />
            </a>
            <a href="https://github.com/iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="GitHub">
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.linkedin.com/in/iamhtk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.youtube.com/@avlnce" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="YouTube">
              <Youtube className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.instagram.com/hrithiksanyal/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Instagram">
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a href="https://www.facebook.com/Avlnce/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Facebook">
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a href="https://x.com/hrithiksanyal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="X (Twitter)">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://soundcloud.com/avlncemusic" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="SoundCloud">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 800 348" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M101.875 163.438C99.375 163.438 97.5 165.313 97.1875 168.125L90 255.625L97.1875 340.313C97.5 342.813 99.375 345 101.875 345C104.375 345 106.25 343.125 106.563 340.313L114.687 255.625L106.563 168.125C106.25 165.313 104.063 163.438 101.875 163.438Z" fill="currentColor" />
                <path d="M133.75 169.062C130.938 169.062 128.438 171.25 128.438 174.375L121.875 255.625L128.438 340.937C128.75 344.062 130.938 346.25 133.75 346.25C136.563 346.25 138.75 344.062 139.062 340.937L146.562 255.625L139.062 174.375C138.75 171.25 136.563 169.062 133.75 169.062Z" fill="currentColor" />
                <path d="M38.75 180.312C37.1875 180.312 35.625 181.562 35.3125 183.438L27.5 255.312L35.3125 325.625C35.625 327.5 36.875 328.75 38.75 328.75C40.3125 328.75 41.875 327.5 42.1875 325.625L51.25 255.312L42.1875 183.438C41.5625 181.875 40.3125 180.312 38.75 180.312Z" fill="currentColor" />
                <path d="M9.06248 207.812C7.49998 207.812 5.93748 209.063 5.93748 210.938L0 255.625L5.93748 299.375C6.24998 301.25 7.49998 302.5 9.06248 302.5C10.625 302.5 11.875 301.25 12.1875 299.375L19.0625 255.625L12.1875 211.25C11.875 209.375 10.625 207.812 9.06248 207.812Z" fill="currentColor" />
                <path d="M198.438 86.5625C194.688 86.5625 191.875 89.375 191.563 93.125L185.625 255.625L191.563 340.625C191.875 344.375 194.688 347.187 198.438 347.187C202.188 347.187 205 344.375 205.313 340.625L211.875 255.625L205.313 93.125C205 89.375 201.875 86.5625 198.438 86.5625Z" fill="currentColor" />
                <path d="M70 166.25C67.8125 166.25 66.25 167.812 65.9375 170.312L58.4375 255.625L65.9375 337.812C66.25 340 67.8125 341.875 70 341.875C72.1875 341.875 73.75 340.312 74.0625 338.125L82.5 255.938L74.0625 170.625C73.75 168.125 72.1875 166.25 70 166.25Z" fill="currentColor" />
                <path d="M165.938 117.5C162.813 117.5 160 120 160 123.437L153.75 255.625L160 340.938C160.313 344.375 162.813 346.875 165.938 346.875C169.063 346.875 171.875 344.375 171.875 340.938L179.063 255.625L171.875 123.437C171.875 120 169.063 117.5 165.938 117.5Z" fill="currentColor" />
                <path d="M364.375 42.1875C358.75 42.1875 354.375 46.5625 354.375 52.1875L350.625 255.313L354.375 336.875C354.375 342.5 359.063 346.875 364.375 346.875C370 346.875 374.375 342.188 374.375 336.875L378.75 255.313L374.375 52.1875C374.688 46.875 370 42.1875 364.375 42.1875Z" fill="currentColor" />
                <path d="M230.937 72.1875C226.875 72.1875 223.75 75.3125 223.438 79.6875L217.812 255.625L223.438 339.687C223.438 343.75 226.875 346.875 230.937 346.875C235 346.875 238.125 343.75 238.438 339.375L244.688 255.313L238.438 79.3751C238.438 75.6251 235 72.1875 230.937 72.1875Z" fill="currentColor" />
                <path d="M701.563 150.625C688.125 150.625 675.313 153.438 663.438 158.125C655.625 69.375 581.25 0 490.625 0C468.438 0 446.875 4.37506 427.812 11.8751C420.312 14.6876 418.438 17.8125 418.438 23.4375V335.625C418.438 341.563 423.125 346.563 429.063 347.188C429.375 347.188 700 347.188 701.875 347.188C756.25 347.188 800.313 303.125 800.313 248.75C800 194.688 755.938 150.625 701.563 150.625Z" fill="currentColor" />
                <path d="M398.125 23.125C392.187 23.125 387.5 28.125 387.187 34.0625L382.812 255.625L387.187 335.937C387.187 341.875 392.187 346.562 398.125 346.562C404.062 346.562 408.75 341.562 409.062 335.625L413.75 255L409.062 33.4375C408.75 28.125 404.062 23.125 398.125 23.125Z" fill="currentColor" />
                <path d="M264.062 65.625C259.687 65.625 256.25 69.0625 255.937 73.75L250.938 255.625L255.937 339.063C255.937 343.438 259.687 347.188 264.062 347.188C268.437 347.188 271.875 343.75 272.188 339.063L277.812 255.625L272.188 73.75C271.875 69.0625 268.437 65.625 264.062 65.625Z" fill="currentColor" />
                <path d="M297.188 69.6875C292.5 69.6875 288.438 73.4375 288.438 78.4375L283.75 255.625L288.438 338.438C288.438 343.438 292.5 347.187 297.188 347.187C301.875 347.187 305.937 343.438 305.937 338.438L311.25 255.625L305.937 78.4375C305.937 73.4375 302.188 69.6875 297.188 69.6875Z" fill="currentColor" />
                <path d="M330.625 75.3125C325.313 75.3125 321.25 79.375 321.25 84.6875L316.875 255.625L321.25 337.812C321.25 343.125 325.625 347.188 330.625 347.188C335.938 347.188 340 343.125 340 337.812L344.688 255.625L340 84.6875C340 79.6875 335.938 75.3125 330.625 75.3125Z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
