type DataEvent = {
  event: string;
  eventCategory: string;
  eventAction: string;
  eventLabel: string;
};

const track = (data: DataEvent): void => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};

export default track;
