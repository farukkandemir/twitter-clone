import ComposeTweet from "@/components/server-components/ComposeTweet";
import TimelineHeader from "@/components/ui-components/TimelineHeader";
import Timeline from "@/components/server-components/Timeline";
import TweetModal from "@/components/server-components/TweetModal";

const Home = async () => {
  return (
    <div className="flex flex-col gap-2">
      {/* <TweetModal /> */}
      <TimelineHeader />
      <ComposeTweet />
      <hr style={{ borderColor: "#273340" }} />
      <Timeline />
    </div>
  );
};

export default Home;
