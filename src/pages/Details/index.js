import React, { useEffect, useState, useContext } from 'react';
import { Button, Image, Typography } from 'antd';
import { ArrowLeftOutlined, StarFilled } from '@ant-design/icons';
import { 
    Wrapper, Container, CardImage, CardMovies, Gender, Contain, Card,
    ContainerTitle, ContainerTitleMovie, ContainerValuation, Valuation, ContainerImage, ContainerDescription
} from './styled';
import { searchAxios } from '../../helpers/api';
import { ActorFilterContext } from '../../context';

const Details = () => {
    const { Title, Paragraph } = Typography;
    const { state } = useContext(ActorFilterContext);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        actorPhoto: "",
        gender: "",
        name: "",
        popularity: 0,
        films: [],
    });

    useEffect(() => {
        const getInfo = async () => {
            try {
                setLoading(true);
                const URL_BASE = `/search/person?query=${state.actor}&api_key=${state.apiKey}`;
                const { data } = await searchAxios({
                    method: "get",
                    url: URL_BASE,
                });
                let filterData = [];
                filterData = data.results.filter(item => item.name === state.actor);
                filterData = filterData.filter(item => item.known_for.length > 0 && 
                    item.known_for_department === "Acting" && item.profile_path !== null);
                let filter = [];
                let inspectElements = {};
                filterData.forEach(element => {
                    inspectElements = {
                        actorPhoto: element.profile_path,
                        gender: element.gender === 2 ? "Hombre" : "Mujer",
                        name: element.name,
                        popularity: element.popularity }
                    filter = [...filter, ...element.known_for]
                });
                setValues({
                    actorPhoto: `https://image.tmdb.org/t/p/w500${inspectElements.actorPhoto}`,
                    gender: inspectElements.gender,
                    name: inspectElements.name,
                    popularity: inspectElements.popularity,
                    films: filter
                })
            } catch (error) {
                setLoading(false);
            }
        }   
        getInfo();
    }, [state]);

    return (
        <Wrapper>
            <Button href="/" type="primary" icon={<ArrowLeftOutlined />}>Regresar</Button>
            <Container>
                <CardImage>
                    <Image
                        width={200}
                        height={300}
                        src={values.actorPhoto}/>
                    <Title style={{ margin: '5px' }} level={2}>{values.name}</Title>
                    <Gender>
                        <Paragraph style={{ margin: '0px' }}>{values.gender}</Paragraph>
                    </Gender>
                    <Title style={{ margin: '5px' }} level={5}>{`Popularidad: ${values.popularity}`}</Title>
                </CardImage>
                <CardMovies>
                    <Contain>
                        <Title style={{ marginBottom: '1rem' }} level={1}>Películas:</Title>
                        {values.films ? 
                            values.films.map((item, idx) => {
                                return (
                                    <Card key={idx}>
                                        <ContainerTitle>
                                            <ContainerTitleMovie>
                                                <Title style={{ margin: '0px' }} level={3}>{item.title}</Title>
                                            </ContainerTitleMovie>
                                            <ContainerValuation>
                                                <Valuation>
                                                    <Title style={{ margin: '0px', marginTop: '5px' }} level={5}>{`${item.vote_average}/10`}</Title>
                                                    <StarFilled style={{ fontSize: '16px', color: '#FFC300', marginTop: '6px', marginLeft: '3px' }}/>
                                                </Valuation>
                                            </ContainerValuation>
                                        </ContainerTitle>
                                        <ContainerImage>
                                            <Image
                                                width={150}
                                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}/>
                                            <ContainerDescription>
                                                <Paragraph style={{ margin: '0px' }}>
                                                    {item.overview}
                                                </Paragraph>
                                                <Title style={{ marginBottom: '0px' }} level={5}>{`Fecha de estreno: ${item.release_date}`}</Title>
                                            </ContainerDescription>
                                        </ContainerImage>
                                    </Card>
                                )
                            })
                        : null}
                    </Contain>
                </CardMovies>
            </Container>
        </Wrapper>
    );
}
 
export default Details;