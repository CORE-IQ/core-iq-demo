const slider = document.getElementById('incomeSlider');
const valueLabel = document.getElementById('incomeValue');
if (slider && valueLabel) {
  const update = () => {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = ((slider.value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #00ffae 0%, #00ffae ${val}%, #333 ${val}%, #333 100%)`;
    valueLabel.textContent = `£${Math.round(slider.value / 1000)}K`;
  };
  slider.addEventListener('input', update);
  update();
}
