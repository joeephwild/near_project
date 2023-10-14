import ConnectButtonNav from "./ConnectButtonNav";

export default function Navbar() {
  return (
    <div>
      <div className="flex items-center justify-between w-full border-b border-Grey pt-[17px] pb-[14px] px-[14px]">
        <div className=""></div>
       <ConnectButtonNav />
      </div>
    </div>
  );
}
