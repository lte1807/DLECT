import Check from "@/components/Check";
import Wear from "@/components/models/Wear";
import Zipper from "@/components/models/Zipper";
import Select from "@/components/Select";
import Show from "@/components/Show";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { Suspense, useState } from "react";
import styled, { css } from "styled-components";
import layerIcon from '../public/icons/layer.png'


function Product() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [model, setModel] = useState("");
  const [layer, setLayer] = useState(false);

  const ClickMenu = (index) => {
    setActiveIndex(index);
  };

  const onSetModel = (url) => {
    setModel(url);
  };

  const layerClickEvent = () => {
    setLayer(!layer);
    console.log(layer);
  }
  

  const menuArr = [
    { name: "SELECT", component: <Select updateModel={onSetModel} /> },
    { name: "CHECK", component: <Check /> },
    { name: "SHOW", component: <Show /> },
  ];
  return (
    <Container>
      <Section>
        <Model>
          <Canvas camera={{ fov: 100 }} style={{ background: "#e6e6e5" }}>
            <OrbitControls target={[0, 0, 0]} />
            <group>
              <Suspense fallback={null}>
                <mesh position={[0, -14, 0]} scale={[10.5, 10.5, 10.5]}>
                  <Wear />
                </mesh>
                {model && (
                  <mesh position={[-0.1, -4, 1]} scale={[0.2, 0.2, 0.01]}>
                    <Zipper model={model} />
                    <meshStandardMaterial attach="material" color={0xa3b18a} />
                  </mesh>
                )}
              </Suspense>
            </group>
            {/* {layer && <Environment files={['/public/hdr/whiteBackground.hdr']} background />} */}
            <Environment
              background={true}
              files={[`/hdr/${layer? 'studio' : 'whiteBackground'}.hdr`]}
            />
            
            <axesHelper args={[5]} />
          </Canvas>
          <LayerChangeBtn src={layerIcon} width={40} height={40} alt="레이어" onClick={layerClickEvent}/>
        </Model>
      </Section>
      <Section>
        <Menu>
          <TabMenu>
            {menuArr.map((menu, index) => (
              <MenuStyle clicked={activeIndex === index} key={index} onClick={() => ClickMenu(index)}>
                {menu.name}
              </MenuStyle>
            ))}
          </TabMenu>
          <SelectItems>{menuArr[activeIndex].component}</SelectItems>
          <CtaButton>
            <CtaButtonStyle>Cart</CtaButtonStyle>
            <CtaButtonStyle>Buy</CtaButtonStyle>
          </CtaButton>
        </Menu>
      </Section>
    </Container>
  );
}

export default Product;


const Container = styled.div`
  width: 100%;
  height: 93%;
`;

const Section = styled.div`
  width: 100%;
  height: 50%;
  
`;

const Menu = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TabMenu = styled.div`
  display: flex;
  flex-basis: 8%;
  justify-content: space-around;
  gap: 2rem;
  margin-top: 10px;
`;

const MenuStyle = styled.button`
  font-size: 1rem;
  font-weight: bold;
  border-radius: 1rem;
  padding: 0.5rem 2rem;
  background-color: white;
  ${props => props.clicked && css`
      top:5px;
      box-shadow: 0 4px 3px 1px #FCFCFC inset;
      border: 0.5px solid #eeeeee;
      margin-right:-2px;
  `
  }
  
`;

const SelectItems = styled.div`
  flex-basis: 80%;
`;
const CtaButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-basis: 12%;
`;

const CtaButtonStyle = styled.button`
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0px 4rem;
  margin-bottom: 15px;
`;

const Model = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LayerChangeBtn = styled(Image)`
  position: absolute;
  bottom: 10px;
  right: 20px;
  z-index: 1;
`