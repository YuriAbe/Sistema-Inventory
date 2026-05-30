package br.com.fatec.api.service;

import br.com.fatec.api.dto.LoginRequestDTO;
import br.com.fatec.api.dto.UsuarioRequestDTO;
import br.com.fatec.api.dto.UsuarioResponseDTO;
import br.com.fatec.api.model.Usuario;
import br.com.fatec.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Page<UsuarioResponseDTO> listar(Pageable pageable) {
        return repository.findAll(pageable).map(UsuarioResponseDTO::fromEntity);
    }

    public UsuarioResponseDTO salvar(UsuarioRequestDTO dto) {
        if (repository.existsByEmail(dto.email())) {
            throw new RuntimeException("Este e-mail já está cadastrado no sistema!");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(dto.nome());
        usuario.setEmail(dto.email());
        String senhaCriptografada = passwordEncoder.encode(dto.senha());
        usuario.setSenha(senhaCriptografada);
        usuario.setRole(dto.role());

        return UsuarioResponseDTO.fromEntity(repository.save(usuario));
    }

    // Criando método de login para validar as credenciais
    public UsuarioResponseDTO login(LoginRequestDTO dto) {

        Usuario usuario = repository
                .findByEmail(dto.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        boolean senhaValida = passwordEncoder.matches(
                dto.senha(),
                usuario.getSenha());

        if (!senhaValida) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Credenciais inválidas");
        }

        return UsuarioResponseDTO.fromEntity(usuario);
    }
}
