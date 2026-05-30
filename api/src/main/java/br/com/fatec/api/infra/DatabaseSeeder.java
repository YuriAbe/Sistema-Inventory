package br.com.fatec.api.infra;

import br.com.fatec.api.model.Role;
import br.com.fatec.api.model.Usuario;
import br.com.fatec.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Verifica se já existe algum usuário no Postgres
        if (usuarioRepository.count() == 0) {
            Usuario admin = new Usuario();
            admin.setNome("Administrador");
            admin.setEmail("admin@fatec.sp.gov.br");

            // Aqui usamos o PasswordEncoder para garantir que o admin
            // já nasça com a senha criptografada no banco
            admin.setSenha(passwordEncoder.encode("admin123"));

            admin.setRole(Role.ADMIN);

            usuarioRepository.save(admin);

            System.out.println("#########################################");
            System.out.println("# USUÁRIO ADMIN CRIADO COM SUCESSO!     #");
            System.out.println("# Login: admin@fatec.sp.gov.br          #");
            System.out.println("# Senha: admin123                       #");
            System.out.println("#########################################");
        }
    }
}