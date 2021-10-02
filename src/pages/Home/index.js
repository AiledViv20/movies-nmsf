import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { InboxOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { DropzoneArea } from 'material-ui-dropzone';
import { Container, Card } from './styled';
import { myAxios } from '../../helpers/api';
import { ActorFilterContext } from '../../context';
import { actions } from '../../context/actions';

const Home = () => {
    const history = useHistory();
    const { dispatch } = useContext(ActorFilterContext);
    const { Title, Paragraph } = Typography;
    const [image, setImage] = useState(null);

    const getActor = async () => {
        try {
            dispatch({ type: actions.getActor });
            let formdata = new FormData();
            formdata.append("file", image);
            const response = await myAxios({
                method: "post",
                url: `/upload`,
                data: formdata
            });
            if (response.status === 200) {
                dispatch({ type: actions.getActorSuccess,
                    payload: response.data.actorName
                });
                history.push(`/detail`);
            }
            
        } catch (error) {
            /* remove data fake*/
                /* dispatch({ type: actions.getActorSuccess,
                    payload: "Brad Pitt"
                });
                history.push(`/detail`); */
            /* remove */
            //Descoment next line
            dispatch({ 
                type: actions.getActorError,
                payload: error
            });
            history.push(`/`);
        }
    };

    const handleChange = (event) => {
        setImage(event[0]);
    };

    useEffect(() => {
        if (image) {
            getActor();
        }
    }, [image]);

    return (
        <>
            <Container>
                <Title level={3}>¿Quién es este actor?</Title>
                <Card>
                    <InboxOutlined style={{ fontSize: '48px', color: '#40a9ff' }}/>
                    <Paragraph>
                        Selecciona la foto de un actor famoso para conocer
                        quién es y en qué películas ha salido.
                    </Paragraph>
                    <DropzoneArea
                        acceptedFiles={["image/*"]}
                        showFileNames
                        dropzoneText="Haz click o arrastra una imagen"
                        className="input"
                        name="image"
                        onChange={handleChange}
                        filesLimit={1}
                    />
                </Card>
            </Container>
        </>
    );
}
 
export default Home;