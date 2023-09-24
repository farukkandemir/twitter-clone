import ComposeTweet from "@/components/server-components/ComposeTweet";
import TimelineHeader from "@/components/ui-components/TimelineHeader";
import Timeline from "@/components/server-components/Timeline";

const Home = async () => {
  return (
    <div className="flex flex-col gap-2">
      <TimelineHeader />
      <ComposeTweet />
      <hr style={{ borderColor: "#273340" }} />
      <Timeline />
    </div>
  );
};

export default Home;
