import { Nav } from "../components";
import { StatusCard } from "../components"
import { ArrowUpRight, ArrowDownLeft, AlignRight, Users } from "lucide-react";
function Dashboard(props) {


    return (
        <>
            <Nav />
<div className="grid grid-cols-2 gap-4 bg-lenden-bg-page px-4 pt-20 md:grid-cols-3 md:pl-65 md:pr-5">
  {/* Net first in code = top on mobile */}
  <StatusCard
    className="col-span-2 md:order-3 md:col-span-1"
    icon={AlignRight}
    title="Net"
    amount="Rs 5,000"
    tone="blue"
    footer={<span>Has been owed</span>}
  />

  <StatusCard
    className="md:order-1"
    icon={ArrowUpRight}
    title="Lent"
    amount="Rs 5,000"
    tone="green"
    footer={
      <>
        <Users className="h-4 w-4" />
        <span>5 people</span>
      </>
    }
  />

  <StatusCard
    className="md:order-2"
    icon={ArrowDownLeft}
    iconClassName="text-lenden-text-red"
    title="Borrowed"
    amount="Rs 5,000"
    tone="red"
    footer={
      <>
        <Users className="h-4 w-4" />
        <span>5 people</span>
      </>
    }
  />
</div>
        </>
    );
}

export default Dashboard