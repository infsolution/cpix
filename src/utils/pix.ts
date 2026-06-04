type PixData = {
  pixKey: string;
  merchantName: string;
  merchantCity: string;
  txid?: string;
  amount?: number;
};

function emv(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

function crc16(payload: string): string {
  let crc = 0xffff;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;

    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }

      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function generatePixPayload({
  pixKey,
  merchantName,
  merchantCity,
  txid = "***",
  amount,
}: PixData): string {
  // Merchant Account Information (ID 26)
  const gui = emv("00", "BR.GOV.BCB.PIX");
  const key = emv("01", pixKey);
  const merchantAccountInfo = emv("26", gui + key);

  const payloadParts = [
    emv("00", "01"), // Payload Format Indicator
    emv("01", "11"), // Static QR
    merchantAccountInfo,
    emv("52", "0000"), // Merchant Category Code
    emv("53", "986"), // BRL
  ];

  if (amount && amount > 0) {
    payloadParts.push(emv("54", amount.toFixed(2)));
  }

  payloadParts.push(
    emv("58", "BR"),
    emv("59", merchantName.substring(0, 25).toUpperCase()),
    emv("60", merchantCity.substring(0, 15).toUpperCase()),
  );

  // Additional Data Field Template
  const additionalData = emv("05", txid);
  payloadParts.push(emv("62", additionalData));

  const payloadWithoutCRC = payloadParts.join("") + "6304";

  const crc = crc16(payloadWithoutCRC);

  return payloadWithoutCRC + crc;
}
