import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/HomePage.module.css';
import { useToast } from "@chakra-ui/toast";



const HomePage = () => {
    const navigate = useNavigate();
    // const {
    //   account,
    //   setAccount,
    //   contract,
    //   setContract,
    //   provider,
    //   setProvider,
    //   userType,
    //   setUserType,
    // } = useVault();
  
    const [data, setdata] = useState({
      address: "",
      Balance: null,
    });
    const toast = useToast();
  
    // const getbalance = (address) => {
    //   // Requesting balance method
    //   window.ethereum
    //     .request({
    //       method: "eth_getBalance",
    //       params: [address, "latest"],
    //     })
    //     .then((balance) => {
    //       // Setting balance
    //       setdata({
    //         Balance: ethers.formatEther(balance),
    //       });
    //     });
    // };
  
    // const accountChangeHandler = (account) => {
    //   // Setting an address data
    //   setdata({
    //     address: account,
    //   });
  
    //   // Setting a balance
    //   getbalance(account);
    // toast({
    //   position: "top",
    //   title: "Connected With Metamask Successfully",
    //   status: "success",
    //   duration: 1500,
    //   isClosable: true,
    // });
    //   navigate("Dashboard", {
    //     state: { address: data["address"], Balance: data["Balance"] },
    //   });
    // };
  
    const requestMetaMaskAccess = async () => {
     
    };
  
    const onLogoClick = useCallback(() => {
      navigate("/");
    }, [navigate]);
  
    const onExercisesClick = useCallback(() => {
      const anchor = document.querySelector(
        "[data-scroll-to='popularExercisesSection']"
      );
      if (anchor) {
        anchor.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }, []);
  
    const onTrainers1Click = useCallback(() => {
      const anchor = document.querySelector("[data-scroll-to='trainers']");
      if (anchor) {
        anchor.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }, []);
  
    const onPricingClick = useCallback(() => {
      navigate("/");
    }, [navigate]);
  
    const onButton1Click = useCallback(() => {
      const anchor = document.querySelector(
        "[data-scroll-to='popularExercisesSection']"
      );
      if (anchor) {
        anchor.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }, []);
  
    const subscribeToEmail = () => {};
  
    return (
      <div className={styles.fitnesslandingpage}>
        <div className={styles.navbar}>
          <div className={styles.nav}>
            <button className={styles.logo} onClick={onLogoClick}>
              E-Vault
            </button>
            <div className={styles.menuright}>
              <div className={styles.menulinks}>
                <button className={styles.exercises} onClick={onPricingClick}>
                  PRICING
                </button>
                <button className={styles.login} onClick={requestMetaMaskAccess}>
                  LOGIN WITH METAMASK
                </button>
              </div>
              <button className={styles.hamburgerIcon}>
                <img className={styles.group2Icon} alt="" src="/group2.svg" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.herosection}>
          <div className={styles.herotext}>
            <div className={styles.herocta}>
              <div className={styles.title}>
                <p className={styles.cardio}>{`Legacy `}</p>
                <p className={styles.cardio} style={{paddingTop:"30px"}}>- Vault</p>
              </div>
              <div className={styles.subtitle}>
              A secure, decentralized vault for managing wills and safeguarding your legacy with trust and transparency.
              </div>
              <div className={styles.buttonrow}>
                <button className={styles.button} onClick={requestMetaMaskAccess}>
                  <div className={styles.getStarted}>Get Started</div>
                </button>
                <button
                  className={styles.button1}
                  onClick={requestMetaMaskAccess}
                >
                  <div className={styles.getStarted}>Preview</div>
                </button>
              </div>
            </div>
          </div>
          <img className={styles.heroimageIcon} alt="" src="/documents.jpg" />
        </div>
        <div
          className={styles.popularexercisessection}
          data-scroll-to="popularExercisesSection"
        >
          <div className={styles.popularexercises}>
            <div className={styles.title1}>
              <div className={styles.popularExercises}>Features</div>
            </div>
  
            <div className={styles.exercisecards}>
              <div className={styles.column1}>
                <div className={styles.exercisecard}>
                  <img
                    className={styles.cardimageIcon}
                    alt=""
                    src="/blockchain.jpg"
                  />
                  <div className={styles.text}>
                    <div className={styles.titles}>
                      <div className={styles.popularExercises}>
                        Blockchain-Based Security
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.exercisecard}>
                  <img className={styles.imageIcon} alt="" src="/interface.jpg" />
                  <div className={styles.text}>
                    <div className={styles.titles}>
                      <div className={styles.popularExercises}>
                        User-Friendly Interfaces
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className={styles.column1}>
                <div className={styles.exercisecard2}>
                  <img className={styles.imageIcon} alt="" src="/privacy.jpg" />
                  <div className={styles.text}>
                    <div className={styles.titles}>
                      <div className={styles.popularExercises}>
                        Privacy and Confidentiality
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.exercisecard}>
                  <img
                    className={styles.imageIcon}
                    alt=""
                    src="/integration.jpg"
                  />
                  <div className={styles.text}>
                    <div className={styles.titles}>
                      <div className={styles.popularExercises}>
                        Integration Capabilities
                      </div>
                      {/* <div
                        className={styles.subtitles}
                      >{`Feature 5 Description`}</div> */}
                    </div>
                  </div>
                </div>
              </div>
  
              <div className={styles.column1}>
                <div className={styles.exercisecard2}>
                  <img className={styles.imageIcon} alt="" src="/scalable.jpg" />
                  <div className={styles.text}>
                    <div className={styles.titles}>
                      <div className={styles.popularExercises}>
                        Scalability and Adaptability
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.exercisecard}>
                  <img
                    className={styles.imageIcon}
                    alt=""
                    src="/transparency.jpg"
                  />
                  <div className={styles.text}>
                    <div className={styles.titles}>
                      <div className={styles.popularExercises}>Transparency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.trainers1} data-scroll-to="trainers">
          <div className={styles.trainerscta}>
            <div className={styles.ctaframe}>
              <div className={styles.background} />
              <div className={styles.title5}>
                <h2 className={styles.workoutProgramMadeContainer}>
                  <p className={styles.cardio}>Secure</p>
                  <p className={styles.cardio}>E-Vault</p>
                  <p className={styles.cardio}>Made</p>
                  <p className={styles.cardio}>For You</p>
                </h2>
                <img className={styles.splashIcon} alt="" src="/splash.svg" />
              </div>
              <div className={styles.description}>
                <div className={styles.loremIpsumDolor}>
                A secure, decentralized vault for managing wills and safeguarding your legacy with trust and transparency.
                </div>
                <button
                  className={styles.button2}
                  onClick={requestMetaMaskAccess}
                >
                  <div className={styles.getStarted1}>Get Started</div>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.trainersimages}>
            <div className={styles.desktop}>
              <div className={styles.trainer3}>
                <img className={styles.trainer3Child} alt="" src="/client.jpg" />
                <div className={styles.samanthaWilliam}>Client</div>
              </div>
              <div className={styles.trainer2}>
                <img className={styles.trainer3Child} alt="" src="/lawyer.jpg" />
                <div className={styles.samanthaWilliam}>Lawyer</div>
              </div>
              <div className={styles.trainer11}>
                <img className={styles.trainer1Child} alt="" src="/judge.jpg" />
                <div className={styles.jonathanWise}>Judge</div>
              </div>
            </div>
            <div className={styles.tablet}>
              <div className={styles.trainer31}>
                <img className={styles.trainer3Item} alt="" src="/judge.jpg" />
                <div className={styles.karenSummer1}>Judge</div>
              </div>
              <div className={styles.trainer21}>
                <img className={styles.trainer2Item} alt="" src="/lawyer.jpg" />
                <div className={styles.jonathanWise1}>Lawyer</div>
              </div>
              <div className={styles.trainer12}>
                <img className={styles.trainer1Item} alt="" src="/client.jpg" />
                <div className={styles.samanthaWilliam1}>Client</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.categoriessection}>
          <div className={styles.popularexercises}>
            <div className={styles.category}>
              <div className={styles.div6}>01</div>
              <div className={styles.action}>
                <div className={styles.titles3}>
                  <div className={styles.title6}>Login With Metamask</div>
                </div>
              </div>
            </div>
            <img className={styles.separatorIcon} alt="" src="/separator.svg" />
            <div className={styles.category}>
              <div className={styles.div6}>02</div>
              <div className={styles.action}>
                <div className={styles.titles3}>
                  <div className={styles.title6}>Create A New Case</div>
                  <div className={styles.courses}>some description</div>
                </div>
              </div>
            </div>
            <img className={styles.separatorIcon} alt="" src="/separator.svg" />
            <div className={styles.category}>
              <div className={styles.div6}>03</div>
              <div className={styles.action}>
                <div className={styles.titles3}>
                  <div className={styles.title6}>Add Stakeholders</div>
                  <div className={styles.courses}>some description</div>
                </div>
              </div>
            </div>
            <img className={styles.separatorIcon} alt="" src="/separator.svg" />
            <div className={styles.category}>
              <div className={styles.div6}>04</div>
              <div className={styles.action}>
                <div className={styles.titles3}>
                  <div className={styles.title6}>Upload Documents</div>
                  <div className={styles.courses}>some description</div>
                </div>
              </div>
            </div>
            <img className={styles.separatorIcon} alt="" src="/separator.svg" />
            <div className={styles.category}>
              <div className={styles.div6}>05</div>
              <div className={styles.action}>
                <div className={styles.titles3}>
                  <div className={styles.title6}>Share Documents Securely</div>
                  <div className={styles.courses}>some description</div>
                </div>
              </div>
            </div>
            <img className={styles.separatorIcon} alt="" src="/separator.svg" />
          </div>
        </div>
        <div className={styles.subscribe}>
          <div className={styles.subscribeform}>
            <div className={styles.title11}>Connect With Us</div>
            <form className={styles.form} id="formID">
              <input className={styles.input} placeholder="Email" type="text" />
              <button
                className={styles.button3}
                type="submit"
                form="formID"
                onClick={subscribeToEmail}
              >
                <div className={styles.getStarted1}>Subscribe</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default HomePage;
  