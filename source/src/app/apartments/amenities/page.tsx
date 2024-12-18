const Amenities = () => {
  const amenitiesList = [
    'High-Speed WiFi',
    'Equipped Kitchen',
    'Air Conditioning',
    'Grill Section',
    'Parking',
    'Pets Allowed',
  ];

  return (
    <section className=" py-20 px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-left py-4 px-2">Amenities</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none text-gray-700">
        {amenitiesList.map((item, index) => (
          <li key={index} className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg shadow-sm">
            <span className="inline-block w-4 h-4 bg-accent rounded-full"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Amenities;