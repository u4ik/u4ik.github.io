import React from 'react'

import Flower from '../../Assets/Images/flower1.svg'
import Cloud from '../../Assets/Images/cloud.png'


import ReactIcon from '../../Assets/Images/react.png'
import Nodejs from '../../Assets/Images/nodejs.svg'
import ScriptIcons from '../../Assets/Images/ScriptIcons.png'
import PostgresIcon from '../../Assets/Images/postgres.png';
import SequelizeIcon from '../../Assets/Images/sequelize.png'
import BootstrapIcon from '../../Assets/Images/bootstrap.png'


import { MDBAnimation, MDBIcon, MDBInput } from "mdbreact";

import Scramble from 'react-scramble'

//Import Title CSS
import './Title.css'
//Import React Spring
import { useSpring, animated } from 'react-spring'

const Title = () => {
    const fade = useSpring({
        from: {
            opacity: 0,

        },
        to: {
            opacity: 1,

        },
        config: { duration: 800 },
        // delay: 800
    })
    const fade1 = useSpring({
        from: {
            opacity: 0,
            // marginTop:'5vw' 

        },
        to: {
            opacity: 1,

        },
        config: { duration: 800 },
        delay: 200
    })
    const fade3 = useSpring({
        from: {
            opacity: 0,

        },
        to: {
            opacity: 1,

        },
        config: { duration: 800 },
        delay: 400
    })
    return (
        <div style={{ }} className='titleWrap'>
            {/* <MDBAnimation type="shake" infinite={true} duration={'15s'} style={{}}>
                <img style={{ pointerEvents: 'none', zIndex: -1, left: '15vw', right: '1vw', bottom: '', top: '-72vw', position: 'absolute', width: '1500px', bottom: '2vw' }} src={Cloud}></img>
            </MDBAnimation> */}

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>





                <animated.div style={fade3} className='titleNameWrap'>
                    <img style={{ width: '15%', opacity: '.2', marginBottom: '', filter: 'drop-shadow(5px 5px 5px black)' }} draggable='false' src={Flower} className='titleImg'></img>
                </animated.div>

                <animated.div style={fade} className='titleNameWrap'>
                    <h1 style={{ zIndex: 2 }} className='titleName'>Amit Mangat</h1>

                </animated.div>
                <animated.div style={fade1} className='titleDescWrap'>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <Scramble
                            style={{ opacity: '.7' }}
                            className='titleDesc'
                            autoStart
                            text="Web Developer/Creative Designer"
                            speed='fast'
                            typewriter={true}
                            steps={[
                                {
                                    roll: 40,
                                    action: '+',
                                    type: 'all',
                                },
                                {
                                    action: '-',
                                    type: 'forward',
                                },
                            ]}
                        />
                        <h5 style={{ opacity: '.7', marginTop: '1%', marginBottom: '-1%' ,fontSize:'.8em'}} className='titleDesc'>"Creativity is intelligence having fun."</h5>
                        <div style={{ marginBottom: '-1%' }}>

                            <img className='icons' style={{ width: '10%', opacity: '.5', marginBottom: '', filter: 'drop-shadow(5px 5px 5px black)' }} draggable='false' src={ScriptIcons} ></img>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>




                            <div style={{ width: '3.5%', margin: '.2%' }}>

                                <img className='icons' style={{ width: '100%', opacity: '.5', marginBottom: '', filter: 'drop-shadow(5px 5px 5px black)' }} draggable='false' src={Nodejs}></img>
                            </div>



                            <div style={{ width: '3.5%', margin: '.2%' }}>

                                <img className='icons' style={{ marginTop: '10%', width: '90%', opacity: '.5', marginBottom: '', filter: 'drop-shadow(5px 5px 5px black)' }} draggable='false' src={BootstrapIcon}></img>
                            </div>

                            <div style={{ width: '5%', margin: '.2%' ,marginLeft:'-1%',marginRight:'-.6%'}}>
                                <img className='icons' style={{ width: '70%', marginTop: '3%', opacity: '.5', marginBottom: '', filter: 'drop-shadow(5px 5px 5px black)' }} draggable='false' src={ReactIcon}></img>
                            </div>




                            <div style={{ width: '3%', margin: '.2%' }}>

                                <img className='icons' style={{ width: '100%', opacity: '.5', marginBottom: '', filter: 'drop-shadow(5px 5px 5px black)' }} draggable='false' src={SequelizeIcon} ></img>
                            </div>

                            <div style={{ width: '3.5%', margin: '.2%' }}>

                                <img className='icons' style={{ marginTop: '2%', width: '90%', opacity: '.5', marginBottom: '', filter: 'drop-shadow(5px 5px 5px black)' }} draggable='false' src={PostgresIcon} ></img>
                            </div>



                        </div>


                    </div>

                </animated.div>


            </div>
        </div>
    )



}

export default Title;