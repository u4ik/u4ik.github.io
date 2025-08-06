import React, { useEffect, useState, useScroll } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmModal = ({ text = '', callback, navigatePath }) => {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate();
    useEffect(() => {
        setOpen(true)
    }, [])

    return (

        < Modal
            basic
            onClose={() => {
                setOpen(false)
                navigate(navigatePath);
            }}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
        >
            <Header icon>
                <Icon name='download' color='green' />
                Amit Mangat's Resume
            </Header>

            <Modal.Content>
                <p style={{ color: 'white' }}>
                    {text}
                </p>
            </Modal.Content>

            <Modal.Actions>

                <Button basic color='red' inverted onClick={() => {
                    setOpen(false)
                    // navigate(navigatePath);
                }}>
                    <Icon name='remove' /> No
                </Button>

                <Button basic color='blue' inverted onClick={() => {
                    setOpen(false)
                    navigate(navigatePath);
                    callback('view');
                }}>
                    <Icon name='eye' /> View
                </Button>

                <Button color='green' inverted onClick={() => {
                    navigate(navigatePath);
                    callback('download');
                    setOpen(false)
                }}>
                    <Icon name='checkmark' /> Yes
                </Button>

            </Modal.Actions>
        </Modal >

    )
}



export default ConfirmModal