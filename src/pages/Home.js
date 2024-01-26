import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, userProfile, } from '../features/authAction';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { ConnectWithoutContact, Group, Public } from '@mui/icons-material';
import { Card, CardContent, Typography, Grid, Container } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import './Home.css'
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';
import Services from './Sevices';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from './Navbar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  homeMain: {
  
    padding: theme.spacing(2),

  },

  badge: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: theme.spacing(3), 
    width: '100%',
    maxWidth: 400,
    fontSize: 16,
    fontWeight:800,
    fontFamily: 'Source Serif 4", Georgia, serif',
    padding: theme.spacing(1),
    color: 'black',
    backgroundColor: '#ffda79',
    marginTop: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      padding: theme.spacing(2),
      marginTop: theme.spacing(12),
      
    },
  },
  heroHeading: {
    maxWidth: 340,
    margin: '40px auto 24px',
    marginTop: theme.spacing(17),
    fontFamily: 'Source Serif 4", Georgia, serif',
    fontSize: 48,
    fontWeight: 400,
    letterSpacing: '-0.5px',
    lineHeight: '56px',
    color: 'black',
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
}));


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, userInfo, authtoken } = useSelector((state) => state.user)



  const getUserProfile = async () => {
    try {
      dispatch(userProfile());
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);
  const handleSearch = () => {
    console.log('Searching...');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    handleSearch(searchTerm);
  };




  function srcset(image) {
    return {
      src: `${image}?fit=crop&auto=format`,
      srcSet: `${image}?fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHdhbGwlMjBwYWludGVyJTIwam9ifGVufDB8fDB8fHww',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Burger',
    },

    {
      img: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Coffee',
      cols: 2,
    },
    {
      img: 'https://images.pexels.com/photos/5767932/pexels-photo-5767932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Hats',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
    },

  ];

  const classes = useStyles();


  return (
    <div>
        <Navbar/>
        <Grid container className={classes.homeMain}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Paper elevation={3} className={classes.badge}>
          Method is used to create a shallow
        </Paper>
        <Typography variant="h1" align="center" >
          <Typography  variant="h1" className={classes.heroHeading}>Connect with</Typography>
          <Typography  variant="h1" className={classes.heroHeading}>Professionals</Typography>
        </Typography>
      </Grid>
      </Grid>


      <div className='main-div'>
        <div className='homemainbody' >
          <div className='homebodyleft'>
            <h1 className='hometxt'>Connect with Professionals</h1>

            <p className='sub-text animated-text'>Explore opportunities, network, and grow together,</p>

            <form className='search-form' onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name='search'
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <IconButton type='submit'>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </form>


          </div>
          <div className='homebodyright'  >
            <Carousel  >
              <Carousel.Item interval={500}>
                <img
                  className="img-h   d-block w-100"
                  src="https://i.imgur.com/HohsnRY.jpg"
                  alt="First slide"
                />

              </Carousel.Item>
              <Carousel.Item interval={500}>
                <img
                  className="img-h   d-block w-100"
                  src="https://img.freepik.com/free-photo/professional-cleaning-service-people-working-together-office_23-2150520596.jpg?w=996&t=st=1705910463~exp=1705911063~hmac=0d5a039632da570be9e05a5373a02e177806d08b06b229939b8fcae96140a571"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="img-h   d-block w-100"
                  src="https://www.bs3services.co.uk/wp-content/uploads/Electrical-Working-Banner.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
          </div  >

        </div>


        <div className='homecardsmain'>
          <div className='homecards'>
            <ConnectWithoutContact className='icon' />
            <p>Connecting needs with expertise </p>
          </div>
          <div className='homecards'>
            <Group className='icon' />
            <p>Empowering professionals,enriching lives</p>
          </div>
          <div className='homecards'>
            <Public className='icon' />
            <p>Crafting a community of expertise </p>
          </div>
        </div>
        <br />
        <br />        <br />
        <br />
        <br />

        <Container>
          {/* <Card className="mt-4" style={{padding:"2%",textAlign:"left"}}> */}
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Your Tasks, Our Professionals -<br />
                  A Partnership For Perfection
                </Typography>
                <br />
                <br />
                <Typography variant="body1" style={{ textAlign: "left" }}>
                  In A World Where Every Task Demands Precision And Expertise, We Believe In Forging A Unique Partnership. Your Tasks Are Not Just Tasks To Us; They Are Opportunities For Perfection. Our Dedicated Professionals Bring Their Skills To The Table, Transforming Challenges Into Triumphs. We Understand That Your Needs Deserve Nothing But The Best, And Together, We Embark On A Journey Towards Excellence. It's Not Just About Getting The Job Done; It's About Crafting A Partnership That Ensures Every Task Is Handled With Care, Commitment, And A Pursuit Of Perfection. Welcome To A Collaboration Where Your Expectations Meet Our Professionals' Dedication – A Partnership For Perfection.

                </Typography>
              </CardContent>
            </Grid>

            <Grid item xs={12} md={6}>
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image source
                alt="Card"
                className="img-fluid"
              />
            </Grid>
          </Grid>
          {/* </Card> */}
        </Container>
        <br />
        <br />
        <br />
        <Container>
          {/* <Card className="mt-4" style={{padding:"2%",textAlign:"left"}}> */}
          <Grid container>
            <Grid item xs={12} md={6}>
              <ImageList variant="quilted" cols={4} rowHeight={121}>
                {itemData.map((item) => (
                  <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}
                  >
                    <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  "Home Harmony: Where Cleanliness Meets Colorful Artistry and Exquisite Decor"
                  <br />
                </Typography>
                <br />
                <br />
                <Typography variant="body1" style={{ textAlign: "left", paddingLeft: "5px" }}>
                  Transform your living space into a sanctuary of beauty and cleanliness with our comprehensive services! Our expert cleaning professionals will leave your home spotless, ensuring every nook and cranny is meticulously attended to. Looking to add a splash of color to your surroundings? Our skilled painters bring artistic flair to your walls, creating a vibrant atmosphere that reflects your style. Elevate your home decor with our talented team, specializing in crafting spaces that blend aesthetics with functionality. From the sparkle of cleanliness to the stroke of artistic brilliance, we are your one-stop solution for a home that radiates perfection. Experience the synergy of cleanliness, captivating colors, and exquisite decor – because your home deserves nothing but the best!
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
          {/* </Card> */}
        </Container>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div className='service-main'>
          <p className='service-header'>Our Services</p>
        </div>
        <div className='service'>
          <Services />
        </div>
      </div>
      <div >
        <Footer />
      </div>



    </div>
  )
}

export default Home

