import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsBarChart } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import ComposeTweet from "@/components/server-components/ComposeTweet";
import TimelineHeader from "@/components/ui-components/TimelineHeader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

const Tweet = () => {
  return (
    <article className="flex gap-2">
      <div className="w-10 h-10 rounded-full bg-red-900"></div>
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="flex-1 flex items-start justify-between">
            <div className="flex items-center gap-1 text-textGray text-sm">
              <p className="text-white">Name</p>
              <p>@username</p>
              <span>&bull;</span>
              <p>16hr</p>
            </div>
            <div className="text-textGray cursor-pointer p-1 hover:bg-mainGray rounded-full transition-all duration-100 ease-in">
              <BsThreeDots />
            </div>
          </div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            Hello Wordl asperiores consequatur nisi exercitationem laboriosam
            harum esse, amet alias nesciunt quibusdam vitae recusandae eius
            similique tenetur!
          </div>
          <div className="w-full h-72 rounded-lg bg-mainGray mt-2">Image</div>
          <div className="flex items-center justify-between text-lg text-textGray mt-4">
            <FaRegComment />
            <FaRetweet />
            <AiOutlineHeart />
            <BsBarChart />
            <FiShare />
          </div>
        </div>
      </div>
    </article>
  );
};

const Timeline = () => {
  return (
    <section>
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </section>
  );
};

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <div className="border-x-[1px] border-mainGray flex flex-col gap-2">
      <TimelineHeader />
      <ComposeTweet />
      <hr style={{ borderColor: "#273340" }} />
      <Timeline />
    </div>
  );
};

export default Home;
