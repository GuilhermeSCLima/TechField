import { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Sub-redes IPv4 e IPv6",
  description:
    "Entenda as sub-redes IPv4 e IPv6, tabelas, cálculos e exemplos práticos para organizar sua rede.",
};

export default function SubredesPage() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
      <div className="flex flex-col items-start justify-start flex-1 w-full max-w-3xl">
        <div className="bg-[#1a1a1a] rounded-xl p-6 w-full shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Sub-redes IPv4 e IPv6</h1>

          <p className="text-sm mb-6 text-justify">
            <strong>Sub-redes</strong> são divisões de uma rede IP que ajudam a organizar melhor os dispositivos conectados e a distribuir os endereços IP de forma mais eficiente.
          </p>

          <h2 className="text-xl font-semibold mb-2">Tabela IPv4</h2>
          <blockquote className="border-l-4 border-stone-500 pl-4 italic text-stone-300 mb-4">
            Aqui estão os tamanhos mais comuns de sub-redes IPv4.<br />
            A tabela mostra a máscara, quantos IPs ela comporta e quais podem ser usados para hosts.
          </blockquote>

          <div className="overflow-auto mb-6">
            <table className="w-full text-sm text-left text-stone-300 border border-stone-700 rounded">
              <thead className="bg-stone-800">
                <tr>
                  <th className="px-3 py-1 border border-stone-700">CIDR</th>
                  <th className="px-3 py-1 border border-stone-700">Máscara decimal</th>
                  <th className="px-3 py-1 border border-stone-700">Total de IPs</th>
                  <th className="px-3 py-1 border border-stone-700">IPs Válidos</th>
                  <th className="px-3 py-1 border border-stone-700">IPs Navegáveis</th>
                  <th className="px-3 py-1 border border-stone-700">IPs Rede - Broadcast</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["/32","255.255.255.255","1","1","192.168.15.1","192.168.15.1"],
                  ["/31","255.255.255.254","2","2","192.168.15.1 ↔ 192.168.15.2","192.168.15.1 ↔ 192.168.15.2"],
                  ["/30","255.255.255.252","4","2","192.168.15.2 ↔ 192.168.15.3","192.168.15.1 ↔ 192.168.15.4"],
                  ["/29","255.255.255.248","8","6","192.168.15.2 ↔ 192.168.15.7","192.168.15.1 ↔ 192.168.15.8"],
                  ["/28","255.255.255.240","16","14","192.168.15.2 ↔ 192.168.15.15","192.168.15.1 ↔ 192.168.15.16"],
                  ["/27","255.255.255.224","32","30","192.168.15.2 ↔ 192.168.15.31","192.168.15.1 ↔ 192.168.15.32"],
                  ["/26","255.255.255.192","64","62","192.168.15.2 ↔ 192.168.15.63","192.168.15.1 ↔ 192.168.15.64"],
                  ["/25","255.255.255.128","128","126","192.168.15.2 ↔ 192.168.15.127","192.168.15.1 ↔ 192.168.15.128"],
                  ["/24","255.255.255.0","256","254","192.168.15.2 ↔ 192.168.15.255","192.168.15.1 ↔ 192.168.15.256"],
                ].map(([cidr, mask, total, valid, nav, rb]) => (
                  <tr key={cidr} className="odd:bg-stone-900 even:bg-stone-800">
                    <td className="px-3 py-1 border border-stone-700">{cidr}</td>
                    <td className="px-3 py-1 border border-stone-700">{mask}</td>
                    <td className="px-3 py-1 border border-stone-700">{total}</td>
                    <td className="px-3 py-1 border border-stone-700">{valid}</td>
                    <td className="px-3 py-1 border border-stone-700">{nav}</td>
                    <td className="px-3 py-1 border border-stone-700">{rb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="bg-stone-800 rounded p-4 mb-6 text-stone-300 italic border-l-4 border-stone-500">
            <h3 className="font-semibold mb-2">🧠 Notas:</h3>
            <ul className="list-disc list-inside">
              <li>Em <code>/31</code>, ambos os IPs são utilizáveis <strong>em links ponto-a-ponto</strong>, segundo a RFC 3021</li>
              <li>Uma <code>/32</code> representa <strong>um único host</strong> (usado para identificar um dispositivo específico)</li>
            </ul>
          </aside>

          <h2 className="text-xl font-semibold mb-2">Aprenda a calcular o IPv4</h2>
          <p className="mb-4 text-sm">
            Para fazer o cálculo de IPv4 podemos seguir a seguinte lógica:
          </p>

          <aside className="bg-stone-800 rounded p-4 mb-6 text-stone-300 italic border-l-4 border-stone-500">
            <p>$32 - 29 = 3$  ↔ Sendo 32 a maior quantidade de bits que podemos usar em rede</p>
            <p>$2^3 = 8$ ↔ Sendo 8 IPs válidos</p>
          </aside>

          <blockquote className="border-l-4 border-stone-500 pl-4 italic text-stone-300 mb-6">
            <strong>Exemplo:</strong><br />
            <span className="font-mono text-green-400">IP: 177.34.213.34/27</span><br />
            $2^{(32-27)} = 32$<br />
            Totalizando <strong>32 IPs</strong><br />
            Sendo 2 reservados para host e broadcast, exceto para os <code>CIDR /31 e /32</code>
          </blockquote>

          <h2 className="text-xl font-semibold mb-2">Encontrando os IPs navegáveis</h2>
          <p className="mb-4 text-sm">
            Para isso vamos entender o que já temos
          </p>

          <h2 className="text-xl font-semibold mb-2">Fazendo o cálculo da máscara</h2>
          <p className="mb-4 text-sm">
            Para fazer o cálculo da máscara podemos seguir alguns passos:
          </p>

          <h3 className="text-lg font-semibold mb-1">1 – Entenda o CIDR</h3>
          <p className="mb-4 text-sm">
            A notação <strong>CIDR</strong> (ex: <code>/30</code>, <code>/24</code>, <code>/16</code>) indica <strong>quantos bits estão ligados em 1</strong> na máscara de sub-rede.<br />
            Uma máscara <code>/24</code> significa que os <strong>24 primeiros bits</strong> são <code>1</code>.
          </p>

          <h3 className="text-lg font-semibold mb-1">2 – Converta os bits em formato decimal</h3>
          <p className="mb-4 text-sm">
            A máscara de sub-rede é formada por <strong>4 blocos de 8 bits</strong> (totalizando 32 bits).
          </p>

          <div className="overflow-auto mb-6">
            <table className="w-full text-sm text-left text-stone-300 border border-stone-700 rounded">
              <thead className="bg-stone-800">
                <tr>
                  <th className="px-3 py-1 border border-stone-700">Bits ligados (no bloco)</th>
                  <th className="px-3 py-1 border border-stone-700">Binário</th>
                  <th className="px-3 py-1 border border-stone-700">Decimal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["0","00000000","0"],
                  ["1","10000000","128"],
                  ["2","11000000","192"],
                  ["3","11100000","224"],
                  ["4","11110000","240"],
                  ["5","11111000","248"],
                  ["6","11111100","252"],
                  ["7","11111110","254"],
                  ["8","11111111","255"],
                ].map(([bits, bin, dec]) => (
                  <tr key={bits} className="odd:bg-stone-900 even:bg-stone-800">
                    <td className="px-3 py-1 border border-stone-700">{bits}</td>
                    <td className="px-3 py-1 border border-stone-700 font-mono">{bin}</td>
                    <td className="px-3 py-1 border border-stone-700">{dec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mb-6 text-sm font-mono">
            Ex.: <br />
            <code>/29 = 8+8+8+3 =&gt; 255.255.255.224</code>
          </p>

          <h2 className="text-xl font-semibold mb-2">IPv6</h2>
          <blockquote className="border-l-4 border-stone-500 pl-4 italic text-stone-300 mb-4">
            O IPv6 foi projetado com um espaço de endereçamento muito maior que o IPv4 (128 bits contra 32 bits), o que muda bastante a forma como as sub-redes são utilizadas.
          </blockquote>

          <div className="overflow-auto mb-6">
            <table className="w-full text-sm text-left text-stone-300 border border-stone-700 rounded">
              <thead className="bg-stone-800">
                <tr>
                  <th className="px-3 py-1 border border-stone-700">CIDR</th>
                  <th className="px-3 py-1 border border-stone-700">Total de IPs (2ⁿ)</th>
                  <th className="px-3 py-1 border border-stone-700">IPs Válidos para Hosts</th>
                  <th className="px-3 py-1 border border-stone-700">Observações</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["/128","1","1","Um único host (como um /32 no IPv4)"],
                  ["/127","2","2 (ponto-a-ponto)","Usado para links ponto-a-ponto (RFC 6164)"],
                  ["/126","4","2","Pode ser usado para ponto-a-ponto com reserva"],
                  ["/64","2⁶⁴ ≈ 1.84×10¹⁹","~18 quintilhões","Tamanho padrão de sub-rede IPv6"],
                  ["/56","2⁷² ≈ 4.72×10²¹","Divisão comum por empresas","Oferece 256 sub-redes /64"],
                  ["/48","2⁸⁰ ≈ 1.21×10²⁴","Para organizações grandes","Oferece 65.536 sub-redes /64"],
                  ["/32","2⁹⁶ ≈ 7.92×10²⁸","Usado por provedores (ISPs)","Oferece 65.536 /48 ou mais"],
                ].map(([cidr, total, valid, notes]) => (
                  <tr key={cidr} className="odd:bg-stone-900 even:bg-stone-800">
                    <td className="px-3 py-1 border border-stone-700">{cidr}</td>
                    <td className="px-3 py-1 border border-stone-700">{total}</td>
                    <td className="px-3 py-1 border border-stone-700">{valid}</td>
                    <td className="px-3 py-1 border border-stone-700">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="bg-stone-800 rounded p-4 mb-6 text-stone-300 italic border-l-4 border-stone-500">
            <h3 className="font-semibold mb-2">🔍 Notas importantes:</h3>
            <ul className="list-disc list-inside">
              <li><strong>/64</strong> é o tamanho padrão para <strong>uma sub-rede IPv6</strong>. Dispositivos como roteadores domésticos normalmente usam esse tamanho.</li>
              <li>Ao contrário do IPv4, <strong>não existe separação entre rede, host e broadcast</strong> da mesma forma:</li>
              <li>IPv6 <strong>não usa broadcast</strong> — ele usa multicast.</li>
              <li>A separação de “IP de rede” e “último IP” não se aplica como no IPv4.</li>
              <li>Em geral, você <strong>não precisa economizar endereços</strong> no IPv6 — o espaço é abundante de propósito.</li>
            </ul>
          </aside>

          <h2 className="text-xl font-semibold mb-2">🎓 Exemplo prático</h2>
          <p className="mb-4 text-sm">
            <strong>Prefixo:</strong> <code>2001:db8::/64</code><br />
            Espaço de endereços:<br />
            <code>2001:db8:0:0:0000:0000:0000:0000</code> até<br />
            <code>2001:db8:0:0:ffff:ffff:ffff:ffff</code><br />
            Total: <code>2^64</code> IPs possíveis dentro dessa sub-rede.
          </p>

          <h2 className="text-xl font-semibold mb-2">💡 Aprenda a calcular a máscara IPv6</h2>
          <p className="mb-4 text-sm">
            O IPv6 tem 128 bits, e o prefixo CIDR determina quantos bits são fixos para a rede. O restante está disponível para os hosts.
          </p>

          <pre className="bg-stone-800 p-3 mt-2 rounded text-green-400 text-xs overflow-auto mb-4 font-mono">
{`Prefixo: /64
→ Rede: 64 bits
→ Host: 128 - 64 = 64 bits
→ Total de IPs = 2^64
`}
          </pre>

          <pre className="bg-stone-800 p-3 mt-2 rounded text-green-400 text-xs overflow-auto mb-6 font-mono">
{`Prefixo: /48
→ 48 bits fixos para rede
→ 80 bits restantes
→ Total de endereços possíveis = 2^80
`}
          </pre>
        </div>
      </div>
      <Footer />
    </main>
  );
}
