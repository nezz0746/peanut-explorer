import CreateLink from "~/src/components/CreateLink";
import CreateLinkHistory from "~/src/components/CreateLinkHistory";

const NewLinkPage = () => {
  return (
    <div className="p-4 flex flex-row items-start gap-2">
      <CreateLink />
      <CreateLinkHistory />
    </div>
  );
};

export default NewLinkPage;
