import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={50}
        cardInfo={{
          title: "Total Clients",
          value: "$20.4K",
          text: "Ce dernier mois.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Total expeditions",
          value: "$8.2K",
          text: "Ce dernier mois",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Importations",
          value: "$18.2K",
          text: "Ce dernier mois",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29"]}
        percentFillValue={40}
        cardInfo={{
          title: "Exportations",
          value: "$10K",
          text: "Ce dernier mois",
        }}
      />
    </section>
  );
};

export default AreaCards;
