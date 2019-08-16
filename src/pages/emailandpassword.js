import React from 'react';

import OutterWrapper from '../components/wrapper';
import Row from '../components/row';
import * as Animatable from "react-native-animatable";

export default props => {
    eturn (
        <OutterWrapper>
            <Row>
                <Header title={loginContent.title} />
            </Row>
            <Row>
                <Animatable.View
                    animation="pulse"
                    iterationCount="infinite"
                    delay={200}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                    }}
                >
                    <Image
                        source={require("../../assets/images/icons/band-aid.png")}
                        style={{ width: 100, height: 100 }}
                    />
                </Animatable.View>
            </Row>
            {maybeShowLoading()}

        </OutterWrapper>
    );
}