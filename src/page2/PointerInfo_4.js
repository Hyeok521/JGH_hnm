import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

const PointerInfo_4 = () => {
  const mapRef = useRef(null);
  const infowindowsRef = useRef([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [forecastStart, setForecastStart] = useState(0);
  const [markerInfos, setMarkerInfos] = useState([]);
  const navigate = useNavigate();

  const slideForecast = (direction) => {
    if (direction === "left" && forecastStart > 0) {
      setForecastStart(forecastStart - 1);
    } else if (direction === "right" && forecastStart < 43) {
      setForecastStart(forecastStart + 1);
    }
  };

  const fetchWeatherInfo = async (lat, lng) => {
    const API_KEY = "e7f59aaca8543637eab9ad2b801f9249";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}&lang=kr`
    );
    const data = await response.json();
    return data;
  };

  const fetchHourlyWeatherInfo = async (lat, lng) => {
    const API_KEY = "e7f59aaca8543637eab9ad2b801f9249";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}&lang=kr`
    );
    const data = await response.json();
    return data;
  };

  const showInfoOnMarker = async (
    lat,
    lng,
    resultAddress,
    marker,
    map,
    index
  ) => {
    const weatherInfo = await fetchWeatherInfo(lat, lng);
    const temperature = weatherInfo.main.temp;
    const description = weatherInfo.weather[0].description;
    const humidity = weatherInfo.main.humidity;
    const content = `<div style="white-space: nowrap;">포인트 이름: ${resultAddress}<br>현재 온도: ${temperature}°C<br>현재 날씨: ${description}<br>현재 습도: ${humidity}%</div>`;
    document.querySelector(".location-info h5").innerHTML = content;

    const markerData = locations[index];
    setMarkerInfos([{ images: markerData.image, texts: markerData.text }]);

    const infowindow = new window.kakao.maps.InfoWindow({
      content: `<div>${resultAddress}</div>`,
    });
    infowindowsRef.current.push(infowindow);
    infowindow.open(map, marker);
  };

  const locations = [
    {
      name: "구산해수욕장",
      lat: 36.75271,
      lng: 129.468,
      image: [
        {
          url: "https://i.namu.wiki/i/-RHOICD8ksfRhw0ohNIUk8g0LqCO_FeKUGP2RYped5dr4aLy0nNqkzxD3TzlL3mNsB3GOEv9C1VF9m2BogUiEJfS4igWbVQf84eP9i2n9aSPAGJRAcMp45SV8ErV57EbaIrEZFxDHlFqTzEflA2-YA.webp",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "보리멸",
            "먹이: 먹이는 작은 어류, 갑각류, 갯지렁이류 등의 저서생물을 주로 섭이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "고래불해수욕장",
      lat: 36.60001,
      lng: 129.4117,
      image: [
        {
          url: "https://i.namu.wiki/i/yowrjhx8oRAlfN-iUI7XE7L_Ca6zVff-EjIsV12JOyMvGnZZCAMxOB1xgoAOTIDsq2NuVJ7kkDaVKBLV0kW1XQNLSYjNzBHv-NF7HdpvJDu5T9H-H9u68cI9mk8yg0rneYe-uY9T6e7aMoCTljiC7A.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/6AejGjWXZEcz-r0OGYkCR1Ge1uTqrli9wKmlBB7B0LZ5YvJi_OycfsFKL6qsylGcQuHvSxAZ0aD2XaoW9t6kPVEQwIvnGhZCwOYLhAYLJG_En-GKtZLqj6xHP_dCrDKsI2zCYL9Cs3vdPJ6bS-hRKw.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/78Hh0rw8DWD_SNeWQdIWOAjPbzbwZxdldpx5faT-SA8P7Nfn0gt3rOEgyrKYhBlqgJadlcXZqwDfiYBfoZNnCZkgFz0sl5bgL_QB42oMuziuqU5BIfYK0CC7xQfYk-nIaHMm6GUqYzJ6oQCLOSISJA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/-RHOICD8ksfRhw0ohNIUk8g0LqCO_FeKUGP2RYped5dr4aLy0nNqkzxD3TzlL3mNsB3GOEv9C1VF9m2BogUiEJfS4igWbVQf84eP9i2n9aSPAGJRAcMp45SV8ErV57EbaIrEZFxDHlFqTzEflA2-YA.webp",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "망상어",
            "먹이: 갯지렁이류 등 펄바닥의 작은 동물",
            "크기: 최대 25cm",
            "서식지: 전 연안 수심 30m 정도의 얕은 바다",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "노래미",
            "먹이: 육식성(작은 갑각류)",
            "크기: 최대 60cm",
            "서식지: 연안의 다소 얕은 곳의 해조류나 암초가 있는 곳",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "보리멸",
            "먹이: 먹이는 작은 어류, 갑각류, 갯지렁이류 등의 저서생물을 주로 섭이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "대진해수욕장",
      lat: 36.565,
      lng: 129.4269,
      image: [
        {
          url: "https://i.namu.wiki/i/-RHOICD8ksfRhw0ohNIUk8g0LqCO_FeKUGP2RYped5dr4aLy0nNqkzxD3TzlL3mNsB3GOEv9C1VF9m2BogUiEJfS4igWbVQf84eP9i2n9aSPAGJRAcMp45SV8ErV57EbaIrEZFxDHlFqTzEflA2-YA.webp",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "보리멸",
            "먹이: 먹이는 작은 어류, 갑각류, 갯지렁이류 등의 저서생물을 주로 섭이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "경정2리",
      lat: 36.49002,
      lng: 129.4431,
      image: [
        {
          url: "https://i.namu.wiki/i/78Hh0rw8DWD_SNeWQdIWOAjPbzbwZxdldpx5faT-SA8P7Nfn0gt3rOEgyrKYhBlqgJadlcXZqwDfiYBfoZNnCZkgFz0sl5bgL_QB42oMuziuqU5BIfYK0CC7xQfYk-nIaHMm6GUqYzJ6oQCLOSISJA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/ExzD3VKQvO4EPUHcdGGcfCxziPaFFeLm8PRHGquuZ01C9aOXBCLoaELgOpOHiBy5Py04PY45EFMVnMAtixIXdvUAMPNmZD3NVeyoV1kCUUd-ej7u6AGNrcLwJa1H6kWtaH9yBtKD2Vjss7bYEyiXuA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/5cksvQyJXke3tfMPw33WzIn24R7fXCTQlAu5DazMjIzSy5pvGYVfn50vtrj1TcVL217n-14fQmB0tDp4QryQw4qwD4Fs28X_1LvprYqJqETbu-HRIGPG_1ziFSTmFH7IIcYyS4alDMGcahEWyZcBew.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/-RHOICD8ksfRhw0ohNIUk8g0LqCO_FeKUGP2RYped5dr4aLy0nNqkzxD3TzlL3mNsB3GOEv9C1VF9m2BogUiEJfS4igWbVQf84eP9i2n9aSPAGJRAcMp45SV8ErV57EbaIrEZFxDHlFqTzEflA2-YA.webp",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "용치놀래기",
            "먹이: 잡식성으로 갯지렁이류, 조개류, 새우류 등 동물성 먹이 뿐만 아니라 알 등도 먹는다.",
            "크기: 최대 34cm",
            "서식지: 수심이 얕은 사질 및 암반 연안해역에 서식",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "황어",
            "먹이: 수서곤충, 작은 물고기, 부착 조류 등을 먹는다.",
            "크기: 최대 45cm",
            "서식지: 동해 전 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "보리멸",
            "먹이: 먹이는 작은 어류, 갑각류, 갯지렁이류 등의 저서생물을 주로 섭이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "영덕 동명축양장",
      lat: 36.45543,
      lng: 129.4354,
      image: [
        {
          url: "https://i.namu.wiki/i/78Hh0rw8DWD_SNeWQdIWOAjPbzbwZxdldpx5faT-SA8P7Nfn0gt3rOEgyrKYhBlqgJadlcXZqwDfiYBfoZNnCZkgFz0sl5bgL_QB42oMuziuqU5BIfYK0CC7xQfYk-nIaHMm6GUqYzJ6oQCLOSISJA.webp",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "영덕 노물",
      lat: 36.45182,
      lng: 129.4295,
      image: [
        {
          url: "https://i.namu.wiki/i/78Hh0rw8DWD_SNeWQdIWOAjPbzbwZxdldpx5faT-SA8P7Nfn0gt3rOEgyrKYhBlqgJadlcXZqwDfiYBfoZNnCZkgFz0sl5bgL_QB42oMuziuqU5BIfYK0CC7xQfYk-nIaHMm6GUqYzJ6oQCLOSISJA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/FbMZrkB_b6ybs3yj-oxiPydBdkO_m_PeHASBYSvVjIW7LvoFndDY43BfBtntLeVQKJoFCmuq2L_jPVHuGEUnMiP-3rQy4UzhMutQ2QuKozjqhd3rXTDRpAq_2HsKc1BfXONADZGnldW2J7V2jy1gNg.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/ExzD3VKQvO4EPUHcdGGcfCxziPaFFeLm8PRHGquuZ01C9aOXBCLoaELgOpOHiBy5Py04PY45EFMVnMAtixIXdvUAMPNmZD3NVeyoV1kCUUd-ej7u6AGNrcLwJa1H6kWtaH9yBtKD2Vjss7bYEyiXuA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/5cksvQyJXke3tfMPw33WzIn24R7fXCTQlAu5DazMjIzSy5pvGYVfn50vtrj1TcVL217n-14fQmB0tDp4QryQw4qwD4Fs28X_1LvprYqJqETbu-HRIGPG_1ziFSTmFH7IIcYyS4alDMGcahEWyZcBew.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/-RHOICD8ksfRhw0ohNIUk8g0LqCO_FeKUGP2RYped5dr4aLy0nNqkzxD3TzlL3mNsB3GOEv9C1VF9m2BogUiEJfS4igWbVQf84eP9i2n9aSPAGJRAcMp45SV8ErV57EbaIrEZFxDHlFqTzEflA2-YA.webp",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "벵에돔",
            "먹이: 겨울에는 주로 해조류를 먹으며, 여름에는 작은 동물 등을 잡아먹는다.",
            "크기: 최대 60cm",
            "서식지: 동해와 남해, 제주도 연안 해역",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "용치놀래기",
            "먹이: 잡식성으로 갯지렁이류, 조개류, 새우류 등 동물성 먹이 뿐만 아니라 알 등도 먹는다.",
            "크기: 최대 34cm",
            "서식지: 수심이 얕은 사질 및 암반 연안해역에 서식",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "황어",
            "먹이: 수서곤충, 작은 물고기, 부착 조류 등을 먹는다.",
            "크기: 최대 45cm",
            "서식지: 동해 전 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "보리멸",
            "먹이: 먹이는 작은 어류, 갑각류, 갯지렁이류 등의 저서생물을 주로 섭이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
    {
      name: "영덕 강구 하저",
      lat: 36.40229,
      lng: 129.3985,
      image: [
        {
          url: "https://i.namu.wiki/i/78Hh0rw8DWD_SNeWQdIWOAjPbzbwZxdldpx5faT-SA8P7Nfn0gt3rOEgyrKYhBlqgJadlcXZqwDfiYBfoZNnCZkgFz0sl5bgL_QB42oMuziuqU5BIfYK0CC7xQfYk-nIaHMm6GUqYzJ6oQCLOSISJA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/ExzD3VKQvO4EPUHcdGGcfCxziPaFFeLm8PRHGquuZ01C9aOXBCLoaELgOpOHiBy5Py04PY45EFMVnMAtixIXdvUAMPNmZD3NVeyoV1kCUUd-ej7u6AGNrcLwJa1H6kWtaH9yBtKD2Vjss7bYEyiXuA.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/5cksvQyJXke3tfMPw33WzIn24R7fXCTQlAu5DazMjIzSy5pvGYVfn50vtrj1TcVL217n-14fQmB0tDp4QryQw4qwD4Fs28X_1LvprYqJqETbu-HRIGPG_1ziFSTmFH7IIcYyS4alDMGcahEWyZcBew.webp",
          style: {},
        },
        {
          url: "https://i.namu.wiki/i/-RHOICD8ksfRhw0ohNIUk8g0LqCO_FeKUGP2RYped5dr4aLy0nNqkzxD3TzlL3mNsB3GOEv9C1VF9m2BogUiEJfS4igWbVQf84eP9i2n9aSPAGJRAcMp45SV8ErV57EbaIrEZFxDHlFqTzEflA2-YA.webp",
          style: {},
        },
      ],
      text: [
        {
          content: [
            "감성돔",
            "먹이: 게, 새우 등 갑각류와 조개, 홍합, 따개비, 삿갓조개와 지렁이류도 좋아하는 편",
            "크기: 최대 50~60cm",
            "서식지: 서해, 남해 / 수심 50m 이내인 바닥이 해조류가 있는 모래질이거나 암초지대인 연안에 주로 서식한다.",
            "금어기: 5월",
            "금지체장: 25cm",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "용치놀래기",
            "먹이: 잡식성으로 갯지렁이류, 조개류, 새우류 등 동물성 먹이 뿐만 아니라 알 등도 먹는다.",
            "크기: 최대 34cm",
            "서식지: 수심이 얕은 사질 및 암반 연안해역에 서식",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "황어",
            "먹이: 수서곤충, 작은 물고기, 부착 조류 등을 먹는다.",
            "크기: 최대 45cm",
            "서식지: 동해 전 연안",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
        {
          content: [
            "보리멸",
            "먹이: 먹이는 작은 어류, 갑각류, 갯지렁이류 등의 저서생물을 주로 섭이",
            "크기: 최대 30cm",
            "서식지: 연안 가까이의 모래 바닥이나 강 하구의 간석지",
          ],
          style: [
            { fontSize: "20px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
            { fontSize: "15px" },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=63114d1a191dab97391e7908148e4784&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(36, 128),
          level: 13,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        locations.forEach((location, index) => {
          const position = new window.kakao.maps.LatLng(
            location.lat,
            location.lng
          );
          const marker = new window.kakao.maps.Marker({
            position,
            map: map,
          });

          window.kakao.maps.event.addListener(
            marker,
            "click",
            async function () {
              infowindowsRef.current.forEach((info) => info.close());

              showInfoOnMarker(
                position.getLat(),
                position.getLng(),
                location.name,
                marker,
                map,
                index
              );

              const hourlyWeatherInfo = await fetchHourlyWeatherInfo(
                position.getLat(),
                position.getLng()
              );
              setHourlyForecast(hourlyWeatherInfo.list.slice(0, 48));
            }
          );
        });
        // 지도 형식 변경 버튼을 추가합니다.
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        // 확대/축소 컨트롤을 추가합니다.
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      });
    };
  }, []);

  const goToPointerInfo1 = () => {
    navigate("/PointerInfo_1");
  };
  const goToPointerInfo2 = () => {
    navigate("/PointerInfo_2");
  };
  const goToPointerInfo3 = () => {
    navigate("/PointerInfo_3");
  };
  const goToPointerInfo5 = () => {
    navigate("/PointerInfo_5");
  };
  const goToPointerInfo6 = () => {
    navigate("/PointerInfo_6");
  };
  const goToPointerInfo7 = () => {
    navigate("/PointerInfo_7");
  };
  const goToPointerInfo8 = () => {
    navigate("/PointerInfo_8");
  };

  return (
    <div className="weatherinfo">
      <h4>포인트 정보(동해남부권)</h4>
      <div className="info-wrapper">
        <div className="info-container">
          <div className="local-button-container">
            <button onClick={goToPointerInfo1}>서해중부권</button>
            <button onClick={goToPointerInfo2}>서해남부권</button>
            <button onClick={goToPointerInfo3}>동해중부권</button>
            <button>동해남부권</button>
            <button onClick={goToPointerInfo5}>남해서부권</button>
            <button onClick={goToPointerInfo6}>남해중부권</button>
            <button onClick={goToPointerInfo7}>남해동부권</button>
            <button onClick={goToPointerInfo8}>제주권</button>
          </div>
          <div className="map-container">
            <div className="map" id="kakao-map"></div>
          </div>
        </div>
        <div className="info-bottom">
          <div className="location-info">
            <h5></h5>
          </div>
          <div className="hourly-forecast-slider">
            <h5>일기 예보</h5>
            <div className="slider-container">
              <button
                className="forecast-button"
                onClick={() => slideForecast("left")}
              >
                &lt;
              </button>
              <div className="hourly-forecast">
                {hourlyForecast
                  .slice(forecastStart, forecastStart + 5)
                  .map((forecast, index) => (
                    <div key={index} className="forecast-item">
                      <div>
                        {`${
                          new Date(forecast.dt * 1000).getMonth() + 1
                        }월 ${new Date(
                          forecast.dt * 1000
                        ).getDate()}일 ${new Date(
                          forecast.dt * 1000
                        ).getHours()}시`}
                      </div>
                      <div>{forecast.main.temp}°C</div>
                      <div>{forecast.weather[0].description}</div>
                      <div>{forecast.main.humidity}%</div>
                    </div>
                  ))}
              </div>
              <button
                className="forecast-button"
                onClick={() => slideForecast("right")}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
        <h4 className="mainfish">주요 포획 어종</h4>
        <div className="fishinfo-1">
          {markerInfos.map((info, index) => (
            <div key={index}>
              {info.images.map((image, imageIndex) => (
                <Card
                  key={imageIndex}
                  style={{
                    backgroundColor: "lightblue",
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "70px",
                    width: "1200px",
                    height: "300px",
                  }}
                >
                  <Card.Img
                    variant="right"
                    src={image.url}
                    style={{ width: "600px" }}
                  />
                  <Card.Body>
                    {info.texts &&
                      info.texts[imageIndex] &&
                      (Array.isArray(info.texts[imageIndex].content) ? (
                        info.texts[imageIndex].content.map(
                          (text, textIndex) => (
                            <Card.Text
                              key={textIndex}
                              style={info.texts[imageIndex].style[textIndex]}
                            >
                              {text}
                            </Card.Text>
                          )
                        )
                      ) : (
                        <Card.Text style={info.texts[imageIndex].style}>
                          {info.texts[imageIndex].content}
                        </Card.Text>
                      ))}
                  </Card.Body>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointerInfo_4;
