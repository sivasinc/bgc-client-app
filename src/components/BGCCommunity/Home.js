import React from 'react';
import styled from 'styled-components';
import Main from './CommunityHome';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Leftside from './Leftside';


const Home = (props) => {
    return (
        <Container>
            <Layout>
                <Leftside />
                <Main />
            </Layout>
        </Container>
    );
}

const Container = styled.div`
    max-width: 100%;
`;

const Content = styled.div`
    max-width: 1120px;
    margin-left: auto;
    margin-right: auto;
`;

const Section = styled.section`
    min-height: 50px;
    padding: 16px 0;
    box-sizing: content-box;
    text-align: center;
    text-decoration: underline;
    display: flex;
    justify-content: center;

    h5 {
        color: #6200EE;
        font-size: 14px;

        a {
            font-weight: 700;
        }
    }

    p {
        font-size: 14px;
        color: #434649;
        font-weight: 600;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 0 5px;
    }
`;

const Layout = styled.div`
    display: grid;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0,5fr) minmax(0,12fr);
    column-gap: 25px;
    row-gap: 25px;
    margin: 25px 0;
    /*grid-template-row: auto;*/

    @media (max-width: 768px) {
        display:  flex;
        flex-direction: column;
        padding: 0 5px;
    }
`;

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Home);