import React from 'react'
import { Divider, Image, Icon, ImageGroup } from 'semantic-ui-react'

import gcp from "../../assets/google.svg";
import postman from "../../assets/postman.svg";
import fabric1 from "../../assets/fab.png";
import explorer from "../../assets/explorer.png";
import caliper from "../../assets/caliper.png";
import fablo from "../../assets/fablo.jpg"
const Footer = () => (
    <div style={{ marginTop: "100px" }}>
                    <Divider section />
                        <center>
                            
                        <ImageGroup size="tiny">
                            <Image src={fabric1}></Image>
                            <Image src={explorer}></Image>
                            <Image src={caliper} ></Image>
                            <Image src={fablo} ></Image>
                        </ImageGroup> 
                        <Icon name="docker" size="large"></Icon>
                        <span style={{paddingRight:"10px"}}></span>
                        <Icon name="git square" size="large"></Icon>
                        <span style={{paddingRight:"10px"}}></span>
                        <Icon name="github" size="large"></Icon>
                        <span style={{paddingRight:"10px"}}></span>
                        <Icon name="js square" size="large"></Icon>
                        <span style={{paddingRight:"10px"}}></span>
                        <Icon name="linux" size="large"></Icon>
                        <span style={{paddingRight:"10px"}}></span>
                        <Icon name="node" size="large"></Icon>
                        <span style={{paddingRight:"10px"}}></span>
                        <Icon name="npm" size="large"></Icon>
                        <span style={{paddingRight:"10px"}}></span>
                        <Icon name="react" size="large"></Icon>
                        <span style={{paddingRight:"10px"}}></span>
                        <Image src={gcp} avatar></Image>
                        <span style={{paddingRight:"10px"}}></span>
                        <Image src={postman} avatar></Image>
                        
                        </center>
                        <center style={{marginTop:"10px"}}>
                        <Icon name='copyright'></Icon>
                        <span style={{ marginLeft: '1px' }}>G028 - Network Security</span>
                        </center>
                </div>
  
)

export default Footer