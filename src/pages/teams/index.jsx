import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import fsPromises from "fs/promises";
import path from "path";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/all";

function Team(props) {
  const [index, setIndex] = useState(0);
  const tabs = props.tabs;
  console.log("tabs", tabs);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to("progress", {
      value: 100,
      scrollTrigger: {
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <div className="h-fit w-screen bg-soothing_black">
      <Head>
        <title>Darpan23 - Teams</title>
      </Head>
      <Header id="navbar" />
      {/* <progress max="100" value="0"></progress> */}
      <main>
        <div className='h-[15rem] md:h-[20rem] bg-[url("/banner.png")] object-fill text-white font-clash tracking-wide font-black flex flex-col items-center justify-center'>
          <span className="text-[1rem] pt-12 md:pt-16 md:text-[4rem]">
            DARPAN' 23
          </span>
          <span className="text-[2.5rem] tracking-wider">TEAM</span>
        </div>

        <div className="text-[.6rem] md:text-[1rem] p-8 font-semibold font-chakra flex flex-row gap-4 md:gap-12 items-center justify-center text-white">
          {tabs.map((tab, i) => (
            <span
              key={i}
              className="rounded-full px-4 py-[.3rem] hover:bg-white/20 transition-all duration-500 ease-in-out"
              style={{ border: index === i ? "1.75px solid #9747ff" : "none" }}
              onClick={() => setIndex(i)}
            >
              {tab.name}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-10 pb-10 md:p-6">
          {tabs[index].sections.map((section) => (
            <div
              key={section.id}
              className="relative w-fit flex flex-col h-fit rounded-sm overflow-hidden shadow-2xl hover:shadow-yellow-300/50 transition-all duration-500 ease-in-out"
            >
              <h1 className="text-white font-chakra font-semibold text-[1.5rem] pt-4">
                {section.name}
              </h1>

              {section.members.map((member) => (
                <div key={member.id}>
                  <div
                    className={index == 2 ? "relative teamCard" : "relative"}
                  >
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="teamImage"
                    />
                  </div>
                  <div className="flex justify-between items-end p-4 bg-black bg-opacity-20 ">
                    <div>
                      <h1 className=" text-white font-chakra font-semibold text-[1.5rem] pt-4">
                        {member.name}
                      </h1>
                      <p className="text-white font-chakra font-medium text-[1rem]">
                        {member.post}
                      </p>
                    </div>
                    <Link href={`${member.insta}`}>
                      <FaInstagram
                        size="2rem"
                        className="text-white hover:text-[#9747ff] transition-all duration-500 ease-in-out"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Team;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "/teams.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData,
  };
}
