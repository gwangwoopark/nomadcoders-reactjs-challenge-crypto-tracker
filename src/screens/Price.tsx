import { useLocation } from "react-router-dom";
import { PriceData } from "./Coin";
import { styled } from "styled-components";

enum ChangeStatus {
  plus,
  zero,
  minus,
}

const PriceList = styled.ul`
  padding: 0 10px;
`;

const PriceType = styled.li`
  font-size: 12px;
  color: ${(props) => props.theme.secondaryTextColor};
  margin-bottom: 12px;
`;

const PriceInfo = styled.ul`
  padding: 10px 0;
  display: flex;
  align-items: center;
`;

const PriceValue = styled.li`
  margin-right: 12px;
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

const PriceChange = styled.li<{ changeStatus: ChangeStatus }>`
  font-size: 14px;
  color: ${(props) =>
    props.changeStatus === ChangeStatus.plus
      ? "green"
      : props.changeStatus === ChangeStatus.minus
      ? "red"
      : props.theme.secondaryTextColor};
`;

interface RouteState {
  name: string;
  symbol: string;
  USD: PriceData;
}

function Price() {
  const location = useLocation();
  const { name, symbol, USD } = location.state as RouteState;

  return (
    <div>
      <PriceList>
        <PriceType>
          {name} Price ({symbol})
          <PriceInfo>
            <PriceValue>
              $
              {USD.price
                .toFixed(2)
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            </PriceValue>
            <PriceChange
              changeStatus={
                USD.percent_change_24h > 0
                  ? ChangeStatus.plus
                  : USD.percent_change_24h < 0
                  ? ChangeStatus.minus
                  : ChangeStatus.zero
              }
            >
              {USD.percent_change_24h > 0
                ? "▲ +"
                : USD.percent_change_24h < 0
                ? "▼ "
                : " "}
              {USD.percent_change_24h}%
            </PriceChange>
          </PriceInfo>
        </PriceType>
        <PriceType>
          Market Cap
          <PriceInfo>
            <PriceValue>
              $
              {USD.market_cap
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            </PriceValue>

            <PriceChange
              changeStatus={
                USD.market_cap_change_24h > 0
                  ? ChangeStatus.plus
                  : USD.market_cap_change_24h < 0
                  ? ChangeStatus.minus
                  : ChangeStatus.zero
              }
            >
              {USD.market_cap_change_24h > 0
                ? "▲ +"
                : USD.market_cap_change_24h < 0
                ? "▼ "
                : " "}
              {USD.market_cap_change_24h}%
            </PriceChange>
          </PriceInfo>
        </PriceType>
        <PriceType>
          Volume 24h
          <PriceInfo>
            <PriceValue>
              $
              {USD.volume_24h
                .toFixed(0)
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            </PriceValue>

            <PriceChange
              changeStatus={
                USD.volume_24h_change_24h > 0
                  ? ChangeStatus.plus
                  : USD.volume_24h_change_24h < 0
                  ? ChangeStatus.minus
                  : ChangeStatus.zero
              }
            >
              {USD.volume_24h_change_24h > 0
                ? "▲ +"
                : USD.volume_24h_change_24h < 0
                ? "▼ "
                : " "}
              {USD.volume_24h_change_24h}%
            </PriceChange>
          </PriceInfo>
        </PriceType>
      </PriceList>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Price;
