import React, { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react';
import { FadeInOnScroll } from '../../components'
import './Contact.css'
import { motion } from 'motion/react';
import Globe from '../../components/Globe/Globe2'
import { useEffect } from 'react';
type LocationType = {
    city?: string;
    regionName?: string;
    lat?: number;
    lon?: number;
    [key: string]: unknown;
};

const Contact = () => {
    const [state, handleSubmit] = useForm('mdovgawe');
    const [location, setLocation] = useState<LocationType | null>(null);
    const [currentLocationTemp, setCurrentLocationTemp] = useState<number | null>(null);
    useEffect(() => {
        async function fetchLocation() {
            try {
                const ipRes = await fetch("https://api.ipify.org?format=json");
                const ipData = await ipRes.json();
                const ip = ipData.ip;
                const locRes = await fetch(`http://ip-api.com/json/${ip}`);
                const locData = await locRes.json();

                const weatherData = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${locData.lat}&longitude=${locData.lon}&current=temperature_2m&timeformat=unixtime&temperature_unit=fahrenheit&timezone=auto`);
                const weather = await weatherData.json();
                setCurrentLocationTemp(weather.current.temperature_2m);
                // console.log("Location Data: ", locData);
                setLocation(locData);
            } catch (err) {
                console.error("Error fetching location:", err);
            }
        }
        fetchLocation();
    }, []);

    return (
        <FadeInOnScroll>
            <Globe location={location} />
            <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, duration: 0.5, delay: 1 }}
            className='absolute flex justify-center items-center h-5 p-5 bg-black bg-opacity-10 top-[8em] left-1/2 -translate-x-1/2'>
                <h1 className='text-white text-xs'>How's the weather in {location?.city}, {location?.regionName}? {currentLocationTemp ? currentLocationTemp + "°F" : "Loading..."}</h1>
            </motion.div>
            <div className='contact-container '>
                {
                    state.succeeded ? <h3>Thanks for your message! <br />You can rotate the globe by the way :)</h3> :
                        <>
                            <motion.form initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 120, damping: 12, duration: 0.5 }}
                                viewport={{ once: false, amount: 0.3 }}
                                className="contact-form" onSubmit={handleSubmit}  >
                                <label htmlFor="email">
                                    Email Address:
                                </label>
                                <input
                                    className="contact-input"
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                />
                                <ValidationError
                                    prefix="Email"
                                    field="email"
                                    errors={state.errors}
                                />
                                <label htmlFor="message" >
                                    Message:
                                </label>
                                <textarea
                                    className="contact-text"
                                    id="message"
                                    name="message"
                                    required
                                />
                                <ValidationError
                                    prefix="Message"
                                    field="message"
                                    errors={state.errors}
                                />
                                <button type="submit" className='btn btn-primary' disabled={state.submitting}>
                                    Submit
                                </button>
                            </motion.form>
                        </>
                }

            </div>
        </FadeInOnScroll>
    )
}

export default Contact