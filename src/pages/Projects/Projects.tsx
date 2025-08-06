import { Item, FadeInOnScroll } from '../../components'
import './Project.css';
import projects from './Project_List'

import {
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from "motion/react";


const Projects = () => {
    return (
        <div style={{ height: '94vh', overflowX: 'hidden', paddingBottom: '0', width: '100%', scrollPaddingRight: '0' }}>
            <div className="project-container" >

                <motion.h1
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12, duration: 0.5 }}
                    className="flex-1 text-6xl font-bold"
                >My Projects
                </motion.h1>
                {
                    projects.map((p, idx) => {
                        return (
                            <FadeInOnScroll key={idx}>
                                <Item github={p.gitHub} npm={p.npm} image={p.image} header={p.header} description={p.description} additional={p.additional} viewLink={p.viewLink} />
                            </FadeInOnScroll>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Projects;