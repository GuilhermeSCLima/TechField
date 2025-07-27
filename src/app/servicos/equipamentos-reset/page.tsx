import { Metadata } from "next";
import Image from "next/image";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Equipamentos - Reset",
  description:
    "Procedimento para restaurar roteadores e conversores para as configurações de fábrica.",
};

export default function EquipamentosResetPage() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
      <div className="flex flex-col items-start justify-start flex-1 w-full max-w-3xl">
        <div className="bg-[#1a1a1a] rounded-xl p-6 w-full shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Equipamentos - Reset</h1>

          <p className="text-sm mb-6 text-justify">
            Restaurar roteadores e conversores para as configurações de fábrica,
            com o objetivo de corrigir falhas, remover configurações anteriores
            ou preparar o equipamento para uma nova instalação.
          </p>

          <h2 className="text-xl font-semibold mb-2">Ferramentas necessárias</h2>
          <ul className="list-disc list-inside mb-6 text-sm text-stone-300">
            <li>Clipe ou objeto pontiagudo para pressionar o botão de reset</li>
            <li>Cabo serial</li>
            <li>Computador</li>
            <li>SecureCRT ou outros terminais</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">Equipamentos</h2>
          <div className="space-y-8 text-sm text-stone-300">
            <section>
              <h3 className="text-lg font-semibold mb-1">Cisco - C921</h3>
              <div className="bg-red-900/30 p-3 rounded mb-2">
                ❗ Este equipamento não possui botão de reset físico.
              </div>
              <p className="mb-2">Caso não tenha acesso ao router:</p>
              <ol className="list-decimal list-inside space-y-1 mb-2">
                <li>
                  Conecte o equipamento à tomada e ao computador via cabo serial.
                </li>
                <li>
                  Com o SecureCRT ou outro terminal, ligue o equipamento,
                  enquanto ele liga, pressione a combinação <code>CTRL + C</code>{" "}
                  repetidamente até entrar no modo ROMMON.
                </li>
                <li>
                  Utilize a seguinte sequência de comandos:
                  <pre className="bg-stone-800 p-3 mt-2 rounded text-green-400 text-xs overflow-auto">
                    {`confreg 0x2142 ! Registra a configuração zerada
!
reset ! Reinicia o router
!
enable ! Acessa o modo de configuração
!
write ! Após reiniciar, registra as alterações
!
configure terminal ! Abre o modo de configuração do router
!
config-register 0x2012 ! Retorna para a configuração padrão
!
exit
!
write ! Registra as alterações`}
                  </pre>
                </li>
              </ol>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-1">Huawei - AR611</h3>
              <div className="bg-yellow-700/30 p-3 rounded mb-2">
                ⚠️ Este equipamento possui botão de reset físico.
              </div>
              <ol className="list-decimal list-inside space-y-1 mb-2">
                <li>Ligue o equipamento à tomada.</li>
                <li>
                  Usando um clipe, pressione e segure o botão Reset na parte de
                  trás do roteador por cerca de 10 segundos ou até os LEDs
                  piscarem.
                </li>
              </ol>
              <Image
                src="/equipamentos-reset/ar611.png"
                alt="Localização do botão Reset AR611"
                width={400}
                height={250}
                className="rounded"
              />
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-1">HPE - MSR954</h3>
              <div className="bg-yellow-700/30 p-3 rounded mb-2">
                ⚠️ Este equipamento possui botão de reset físico.
              </div>
              <ol className="list-decimal list-inside space-y-1 mb-2">
                <li>Ligue o equipamento à tomada.</li>
                <li>
                  Usando um clipe, pressione e segure o botão Reset na parte de
                  trás do roteador por cerca de 10 segundos ou até os LEDs
                  piscarem.
                </li>
              </ol>
              <Image
                src="/equipamentos-reset/MSR954.png"
                alt="Localização do botão Reset MSR954"
                width={400}
                height={250}
                className="rounded"
              />
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-1">Datacom</h3>
              <div className="bg-red-900/30 p-3 rounded mb-2">
                ❗ Este equipamento não possui possibilidade de reset; necessário
                contato com a fabricante.
              </div>
              <p>
                Caso tenha acesso ao equipamento (modelos 4gt, 6gt, edd), pode
                ser possível usar:
              </p>
              <pre className="bg-stone-800 p-3 mt-2 rounded text-green-400 text-xs overflow-auto">
                copy default-config startup-config
              </pre>
              <p className="mt-1">e reiniciar o equipamento.</p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
