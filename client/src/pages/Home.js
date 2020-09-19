import React from "react";
import Navbar from "../components/NavBar";
import RequestersThumnail from "../components/RequestersThumbnail";
import Footer from "../components/Footer";
import faker from "faker";

const HomeImage = "/img/home.jpg";
const requesterList = [];
for (let i = 0; i < 6; i++) {
  requesterList.push({
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    image: faker.image.image(),
    description: faker.lorem.sentence(),
  });
}

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <section>
        <img className="home-image" src={HomeImage} alt="Home" />
      </section>
      <h2>Featured Requesters</h2>
      <div className="list-grid">
        {requesterList.map((requester) => (
          <RequestersThumnail
            key={requester.id}
            image={requester.image}
            name={requester.name}
            description={requester.description}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
