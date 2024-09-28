import CreateLink from "~/src/components/CreateLink";
import CreateLinkHistory from "~/src/components/CreateLinkHistory";

const NewLinkPage = () => {
  return (
    <div className="p-4 flex flex-col md:flex-row items-start gap-2">
      <div className="flex flex-col gap-2 w-full md:w-[40%]">
        <CreateLink />
      </div>
      <div className="md:flex-grow w-full">
        <CreateLinkHistory />
      </div>
    </div>
  );
};

export default NewLinkPage;
